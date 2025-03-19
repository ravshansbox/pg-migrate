import pg from 'pg';
import { type Migration } from './types.js';
import { logger } from './logger.js';

export async function revertMigration(client: pg.Client, migration: Migration) {
  logger.info(`${migration.name}...`);
  await client.query(migration.down);
  await client.query(`delete from _migrations where name = $1`, [
    migration.name,
  ]);
  logger.info('done\n');
}
