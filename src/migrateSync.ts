import pg from 'pg'
import { getAllMigrations } from './getAllMigrations.js'
import { getAppliedMigrations } from './getAppliedMigrations.js'
import { revertMigrations } from './revertMigrations.js'
import { migrateUp } from './migrateUp.js'

export async function migrateSync(client: pg.Client) {
  const allMigrations = await getAllMigrations()
  const appliedMigrations = await getAppliedMigrations(client)
  const danglingMigrations = appliedMigrations.filter(
    appliedMigration => !allMigrations.includes(appliedMigration.name),
  )
  if (danglingMigrations.length > 0) {
    await revertMigrations(client, danglingMigrations)
  }
  await migrateUp(client)
}
