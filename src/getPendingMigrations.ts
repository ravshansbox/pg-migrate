import pg from 'pg';
import { getAllMigrations } from './getAllMigrations.js';
import { getAppliedMigrations } from './getAppliedMigrations.js';

export async function getPendingMigrations(client: pg.Client) {
  const allMigrations = await getAllMigrations();
  const appliedMigrations = await getAppliedMigrations(client);
  const appliedMigrationNames = appliedMigrations.map(
    (migration) => migration.name,
  );
  return allMigrations.filter((file) => !appliedMigrationNames.includes(file));
}
