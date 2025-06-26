import { wrapInClient } from './wrapInClient.js'

export async function setupDatabase() {
  await wrapInClient(async client => {
    await client.query(
      'create table if not exists _migrations (name text primary key, down text)',
    )
  })
}
