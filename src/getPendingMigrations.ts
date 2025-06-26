import { getAllMigrations } from './getAllMigrations.js'
import { getAppliedMigrations } from './getAppliedMigrations.js'

export async function getPendingMigrations() {
  const allMigrations = await getAllMigrations()
  const appliedMigrations = await getAppliedMigrations()
  const appliedMigrationNames = appliedMigrations.map(
    migration => migration.name,
  )
  return allMigrations.filter(file => !appliedMigrationNames.includes(file))
}
