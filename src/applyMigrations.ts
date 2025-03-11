import { wrapInTransation } from './wrapInTransation.js';
import { applyMigration } from './applyMigration.js';

export async function applyMigrations(migrations: string[]) {
  if (migrations.length === 0) {
    process.stdout.write('No new migrations to apply\n');
    return;
  }
  process.stdout.write('Applying migrations\n');
  await wrapInTransation(async (client) => {
    const sortedMigrations = migrations.toSorted();
    for (const migration of sortedMigrations) {
      await applyMigration(client, migration);
    }
  });
  process.stdout.write('Migrations applied\n');
}
