import pg from 'pg'
import { getAppliedMigrations } from './getAppliedMigrations.js'
import { revertMigrations } from './revertMigrations.js'

export async function migrateDown(client: pg.Client) {
  const appliedMigrations = await getAppliedMigrations(client)
  await revertMigrations(client, appliedMigrations)
}
