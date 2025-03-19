import { wrapInTransation } from './wrapInTransation.js';
import { applyMigration } from './applyMigration.js';
import { logger } from './logger.js';

export async function applyMigrations(migrations: string[]) {
  if (migrations.length === 0) {
    logger.info('No new migrations to apply\n');
    return;
  }
  logger.info('Applying migrations\n');
  await wrapInTransation(async (client) => {
    const sortedMigrations = migrations.toSorted();
    for (const migration of sortedMigrations) {
      await applyMigration(client, migration);
    }
  });
  logger.info('Migrations applied\n');
}
