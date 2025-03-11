import { wrapInTransation } from './wrapInTransation.js';
import { getAppliedMigrations } from './getAppliedMigrations.js';
import { revertMigrations } from './revertMigrations.js';

export function migrateDown() {
  return wrapInTransation(async (client) => {
    const appliedMigrations = await getAppliedMigrations(client);
    await revertMigrations(appliedMigrations);
  });
}
