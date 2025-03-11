import fs from 'node:fs/promises';
import path from 'path';
import pg from 'pg';
import { parseMigration } from './parseMigration.js';

export async function applyMigration(client: pg.Client, migration: string) {
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
