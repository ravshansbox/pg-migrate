import pg from 'pg';
import { wrapInClient } from './wrapInClient.js';

export async function wrapInTransation<T>(
  fn: (client: pg.Client) => Promise<T>,
) {
  return wrapInClient(async (client) => {
    try {
      await client.query('begin');
      return await fn(client);
    } catch (error) {
      await client.query('rollback');
      throw error;
    } finally {
      await client.query('commit');
    }
  });
}
