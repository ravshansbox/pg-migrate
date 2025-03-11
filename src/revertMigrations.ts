import { type Migration } from './types.js';
import { wrapInTransation } from './wrapInTransation.js';
import { sortByProp } from './sortByProp.js';
import { revertMigration } from './revertMigration.js';

export async function revertMigrations(migrations: Migration[]) {
  if (migrations.length === 0) {
    process.stdout.write('No migrations to revert\n');
    return;
  }
  process.stdout.write('Reverting migrations\n');
  await wrapInTransation(async (client) => {
    const sortedMigrations = migrations
      .toSorted(sortByProp('name'))
      .toReversed();
    for (const migration of sortedMigrations) {
      await revertMigration(client, migration);
    }
  });
  process.stdout.write('Migrations reverted\n');
}
