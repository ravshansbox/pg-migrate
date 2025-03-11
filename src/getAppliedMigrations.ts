import pg from 'pg';
import { type Migration } from './types';

export async function getAppliedMigrations(client: pg.Client) {
  const { rows } = await client.query<Migration>(
    'select name, down from _migrations'
  );
  return rows;
}
