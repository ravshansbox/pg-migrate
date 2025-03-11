import { wrapInTransation } from './wrapInTransation.js';
import { setupDatabase } from './setupDatabase.js';
import { getPendingMigrations } from './getPendingMigrations.js';
import { applyMigrations } from './applyMigrations.js';

export function migrateUp() {
  return wrapInTransation(async (client) => {
    await setupDatabase(client);
    const pendingMigrations = await getPendingMigrations(client);
    await applyMigrations(pendingMigrations);
  });
}
