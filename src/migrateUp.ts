import pg from 'pg'
import { setupDatabase } from './setupDatabase.js'
import { getPendingMigrations } from './getPendingMigrations.js'
import { applyMigrations } from './applyMigrations.js'

export async function migrateUp(client: pg.Client) {
  await setupDatabase(client)
  const pendingMigrations = await getPendingMigrations(client)
  await applyMigrations(client, pendingMigrations)
}
