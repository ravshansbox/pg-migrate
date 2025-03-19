import { setupDatabase } from './setupDatabase.js';
import { getAllMigrations } from './getAllMigrations.js';
import { getAppliedMigrations } from './getAppliedMigrations.js';
import { revertMigrations } from './revertMigrations.js';
import { migrateUp } from './migrateUp.js';

export async function migrateSync() {
  await setupDatabase();
  const allMigrations = await getAllMigrations();
  const appliedMigrations = await getAppliedMigrations();
  const danglingMigrations = appliedMigrations.filter(
    (appliedMigration) => !allMigrations.includes(appliedMigration.name),
  );
  if (danglingMigrations.length > 0) {
    await revertMigrations(danglingMigrations);
  }
  await migrateUp();
}
