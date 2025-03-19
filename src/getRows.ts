import pg from 'pg';

export async function getRows<T>(promise: Promise<pg.QueryResult<T>>) {
  const { rows } = await promise;
  return rows;
}
