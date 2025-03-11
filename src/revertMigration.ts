import pg from 'pg';
import { type Migration } from './types.js';

export async function revertMigration(client: pg.Client, migration: Migration) {
  process.stdout.write(`${migration.name}...`);
  await client.query(migration.down);
  await client.query(`delete from _migrations where name = $1`, [
    migration.name,
  ]);
  process.stdout.write('done\n');
}
