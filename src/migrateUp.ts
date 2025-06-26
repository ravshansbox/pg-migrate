import { setupDatabase } from './setupDatabase.js'
import { getPendingMigrations } from './getPendingMigrations.js'
import { applyMigrations } from './applyMigrations.js'

export async function migrateUp() {
  await setupDatabase()
  const pendingMigrations = await getPendingMigrations()
  await applyMigrations(pendingMigrations)
}
