import { type Migration } from './types.js'
import { logger } from './logger.js'
import { sortByProp } from './sortByProp.js'
import { wrapInTransation } from './wrapInTransation.js'
import { revertMigration } from './revertMigration.js'

export async function revertMigrations(migrations: Migration[]) {
  if (migrations.length === 0) {
    logger.info('No migrations to revert\n')
    return
  }
  const sortedMigrations = migrations.toSorted(sortByProp('name')).toReversed()
  logger.info('Reverting migrations\n')
  await wrapInTransation(async client => {
    for (const migration of sortedMigrations) {
      await revertMigration(client, migration)
    }
  })
  logger.info('Migrations reverted\n')
}
