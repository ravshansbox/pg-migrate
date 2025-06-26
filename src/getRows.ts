import pg from 'pg'

export async function getRows<T extends pg.QueryResultRow>(
  promise: Promise<pg.QueryResult<T>>,
) {
  const { rows } = await promise
  return rows
}
