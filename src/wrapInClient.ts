import pg from 'pg'
import { DATABASE_URL } from './constants.js'

export async function wrapInClient<T>(fn: (client: pg.Client) => Promise<T>) {
  const client = new pg.Client({ connectionString: DATABASE_URL })
  await client.connect()
  try {
    return await fn(client)
  } finally {
    await client.end()
  }
}
