import pg from 'pg'
import { DATABASE_URL } from './constants.js'

export async function withClient<T>(
  client: pg.Client | undefined,
  fn: (client: pg.Client) => Promise<T>,
): Promise<T> {
  if (client) {
    return fn(client)
  }
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required')
  }
  const newClient = new pg.Client({ connectionString: DATABASE_URL })
  await newClient.connect()
  try {
    return await fn(newClient)
  } finally {
    await newClient.end()
  }
}
