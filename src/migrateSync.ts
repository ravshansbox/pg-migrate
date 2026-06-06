import { setupDatabase } from './setupDatabase.js'
import { getAllMigrations } from './getAllMigrations.js'
import { getAppliedMigrations } from './getAppliedMigrations.js'
import { revertMigrations } from './revertMigrations.js'
import { migrateUp } from './migrateUp.js'
import { wrapInClient } from './wrapInClient.js'

export async function migrateSync(databaseUrl?: string) {
  await wrapInClient(async client => {
    await setupDatabase(client)
    const allMigrations = await getAllMigrations()
    const appliedMigrations = await getAppliedMigrations(client)
    const danglingMigrations = appliedMigrations.filter(
      appliedMigration => !allMigrations.includes(appliedMigration.name),
    )
    if (danglingMigrations.length > 0) {
      await revertMigrations(client, danglingMigrations)
    }
    await migrateUp(client)
  }, databaseUrl)
}
