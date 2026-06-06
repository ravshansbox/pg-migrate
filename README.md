# pg-migrate

A simple, typesafe PostgreSQL migration tool for Node.js applications.

## Features

- Supports up and down migrations
- Transaction-based migration application
- Synchronize to handle dangling migrations
- Simple command-line interface
- TypeScript support out of the box

## Installation

```bash
npm install @ravshansbox/pg-migrate
```

## Usage

### Environment Variables

Configure your database connection:

```
DATABASE_URL=postgres://username:password@host:port/database
```

If not provided, it defaults to `postgres://postgres:postgres@localhost:5432/postgres`.

### Creating Migrations

Create a new migration file:

```bash
pg-migrate make 001_create-users-table
```

This will create a file in the `migrations` directory with the following format:

```sql
-- Up
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- Down
DROP TABLE users;
```

### Running Migrations

Synchronize the database with your migration files(preferred command):

```bash
pg-migrate sync
```

Apply all pending migrations(if you do not want automatic reversions):

```bash
pg-migrate up
```

Revert all applied migrations:

```bash
pg-migrate down
```

## How it Works

pg-migrate keeps track of applied migrations in a `_migrations` table in your database. When you run migrations, it:

1. Checks which migrations have already been applied
2. Wraps new migrations in a transaction
3. Applies migrations in alphanumeric order
4. Records successful migrations along with their "down" SQL for potential rollback

## Migration File Format

Migration files should follow this structure:

```sql
-- Up
-- Your SQL to apply the migration
-- Down
-- Your SQL to reverse the migration
```

The parser looks for these exact markers to separate up and down migrations.

## API Usage

You can also use pg-migrate programmatically in your code. All public functions require a `pg.Client` instance, giving you full control over the connection lifecycle:

```typescript
import pg from 'pg'
import { migrateUp, migrateDown, migrateSync } from '@ravshansbox/pg-migrate'

const client = new pg.Client({ connectionString: 'postgres://user:pass@host:5432/db' })
await client.connect()
try {
  // Apply pending migrations
  await migrateUp(client)

  // Revert migrations
  await migrateDown(client)

  // Synchronize migrations (reverts dangling, then applies pending)
  await migrateSync(client)
} finally {
  await client.end()
}
```

## License

MIT
