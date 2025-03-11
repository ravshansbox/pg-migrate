import pg from 'pg';
import { createClient } from './createClient.js';

export async function wrapInTransation<T>(
  fn: (client: pg.Client) => Promise<T>,
) {
  const client = createClient();
  await client.connect();
  try {
    await client.query('begin');
    const result = await fn(client);
    await client.query('commit');
    return result;
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    client.end();
  }
}
