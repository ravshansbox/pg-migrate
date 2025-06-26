import { wrapInClient } from './wrapInClient.js'
import { getRows } from './getRows.js'
import { type Migration } from './types.js'

export async function getAppliedMigrations() {
  return wrapInClient(client => {
    return getRows(
      client.query<Migration>('select name, down from _migrations'),
    )
  })
}
