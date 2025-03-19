import { type Migration } from './types.js';
import { wrapInTransation } from './wrapInTransation.js';
import { sortByProp } from './sortByProp.js';
import { revertMigration } from './revertMigration.js';
import { logger } from './logger.js';

export async function revertMigrations(migrations: Migration[]) {
  if (migrations.length === 0) {
    logger.info('No migrations to revert\n');
    return;
  }
  logger.info('Reverting migrations\n');
  await wrapInTransation(async (client) => {
    const sortedMigrations = migrations
      .toSorted(sortByProp('name'))
      .toReversed();
    for (const migration of sortedMigrations) {
      await revertMigration(client, migration);
    }
  });
  logger.info('Migrations reverted\n');
}
