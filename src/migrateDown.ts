import { getAppliedMigrations } from './getAppliedMigrations.js'
import { revertMigrations } from './revertMigrations.js'

export async function migrateDown() {
  const appliedMigrations = await getAppliedMigrations()
  await revertMigrations(appliedMigrations)
}
