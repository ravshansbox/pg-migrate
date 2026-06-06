import pg from 'pg'
import { getRows } from './getRows.js'
import { type Migration } from './types.js'

export async function getAppliedMigrations(client: pg.Client) {
  return getRows(
    client.query<Migration>('select name, down from _migrations'),
  )
}
