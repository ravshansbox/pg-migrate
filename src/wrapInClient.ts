import pg from 'pg'
import { DATABASE_URL } from './constants.js'

export async function wrapInClient<T>(
  fn: (client: pg.Client) => Promise<T>,
  databaseUrl: string = DATABASE_URL,
) {
  const client = new pg.Client({ connectionString: databaseUrl })
  await client.connect()
  try {
    return await fn(client)
  } finally {
    await client.end()
  }
}
