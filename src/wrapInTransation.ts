import pg from 'pg'

export async function wrapInTransation<T>(
  client: pg.Client,
  fn: (client: pg.Client) => Promise<T>,
) {
  try {
    await client.query('begin')
    return await fn(client)
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    await client.query('commit')
  }
}
