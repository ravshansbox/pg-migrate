import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const {
  DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/postgres',
} = process.env;

function createClient() {
  return new pg.Client({ connectionString: DATABASE_URL });
}

async function setupDatabase(client: pg.Client) {
  await client.query(
    'create table if not exists _migrations (name text primary key, down text)',
  );
}

async function getAllMigrations() {
  const allMigrations = await fs.readdir(
    path.join(process.cwd(), 'migrations'),
  );
  return allMigrations.filter((migration) => migration.endsWith('.sql'));
}

async function getAppliedMigrations(client: pg.Client) {
  const { rows } = await client.query('select name, down from _migrations');
  return rows;
}

async function getPendingMigrations(client: pg.Client) {
  const allMigrations = await getAllMigrations();
  const appliedMigrations = await getAppliedMigrations(client);
  const appliedMigrationNames = appliedMigrations.map(
    (migration) => migration.name,
  );
  return allMigrations.filter((file) => !appliedMigrationNames.includes(file));
}

const matcher = new RegExp(
  [
    `-- Up Migration\\s*\\n`,
    `([\\s\\S]*)`,
    `-- Down Migration\\s*\\n`,
    `([\\s\\S]*)`,
  ].join(''),
);
function parseMigration(content: string) {
  const match = content.match(matcher);

  if (match === null) throw new Error('Invalid migration file');

  return { up: match[1].trim(), down: match[2].trim() };
}

async function applyMigration(client: pg.Client, migration: string) {
  process.stdout.write(`${migration}...`);
  const sql = await fs.readFile(
    path.join(process.cwd(), 'migrations', migration),
    'utf-8',
  );
  const { up, down } = parseMigration(sql);
  await client.query(up);
  await client.query(`insert into _migrations (name, down) values ($1, $2)`, [
    migration,
    down,
  ]);
  process.stdout.write('done\n');
}

async function applyMigrations(client: pg.Client, migrations: string[]) {
  if (migrations.length === 0) {
    process.stdout.write('No migrations to apply\n');
    return;
  }
  try {
    process.stdout.write('Applying migrations\n');
    await client.query('begin');
    for (const migration of migrations) {
      await applyMigration(client, migration);
    }
    await client.query('commit');
    process.stdout.write('Migrations applied\n');
  } catch (error) {
    await client.query('rollback');
    throw error;
  }
}

export async function migrateUp() {
  const client = createClient();
  await client.connect();
  try {
    await setupDatabase(client);
    const pendingMigrations = await getPendingMigrations(client);
    await applyMigrations(client, pendingMigrations.sort());
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

type Migration = { name: string; down: string };

async function revertMigration(client: pg.Client, migration: Migration) {
  process.stdout.write(`${migration.name}...`);
  await client.query(migration.down);
  await client.query(`delete from _migrations where name = $1`, [
    migration.name,
  ]);
  process.stdout.write('done\n');
}

async function revertMigrations(client: pg.Client, migrations: Migration[]) {
  if (migrations.length === 0) {
    process.stdout.write('No migrations to revert\n');
    return;
  }
  try {
    process.stdout.write('Reverting migrations\n');
    await client.query('begin');
    for (const migration of migrations) {
      await revertMigration(client, migration);
    }
    await client.query('commit');
    process.stdout.write('Migrations reverted\n');
  } catch (error) {
    await client.query('rollback');
    throw error;
  }
}

function sortFn<T extends string, U extends Record<T, unknown>>(prop: T) {
  return (a: U, b: U) => (a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0);
}

export async function migrateDown() {
  const client = createClient();
  await client.connect();
  const appliedMigrations = await getAppliedMigrations(client);
  const migrations = appliedMigrations.sort(sortFn('name')).reverse();
  await revertMigrations(client, migrations);
  await client.end();
}
