import pg from 'pg'
import { logger } from './logger.js'
import { wrapInTransation } from './wrapInTransation.js'
import { applyMigration } from './applyMigration.js'

export async function applyMigrations(
  client: pg.Client,
  migrations: string[],
) {
  if (migrations.length === 0) {
    logger.info('No new migrations to apply\n')
    return
  }
  const sortedMigrations = migrations.toSorted()
  logger.info('Applying migrations\n')
  await wrapInTransation(client, async client => {
    for (const migration of sortedMigrations) {
      await applyMigration(client, migration)
    }
  })
  logger.info('Migrations applied\n')
}
