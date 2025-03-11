import pg from 'pg';

export async function setupDatabase(client: pg.Client) {
  await client.query(
    'create table if not exists _migrations (name text primary key, down text)',
  );
}
