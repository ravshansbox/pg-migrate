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
# or
yarn add @ravshansbox/pg-migrate
# or
pnpm add @ravshansbox/pg-migrate
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
npx -p @ravshansbox/pg-migrate pg-migrate make 001_create-users-table
```

This will create a file in the `migrations` directory with the following format:

```sql
-- Up Migration
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- Down Migration
DROP TABLE users;
```

### Running Migrations

Apply all pending migrations:

```bash
npx -p @ravshansbox/pg-migrate pg-migrate up
```

Revert the most recently applied migrations:

```bash
npx -p @ravshansbox/pg-migrate pg-migrate down
```

Synchronize the database with your migration files (revert dangling migrations and apply new ones):

```bash
npx -p @ravshansbox/pg-migrate pg-migrate sync
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
-- Up Migration
-- Your SQL to apply the migration
-- Down Migration
-- Your SQL to reverse the migration
```

The parser looks for these exact markers to separate up and down migrations.

## API Usage

You can also use pg-migrate programmatically in your code:

```typescript
import { migrateUp, migrateDown, migrateSync } from '@ravshansbox/pg-migrate';

// Apply pending migrations
await migrateUp();

// Revert migrations
await migrateDown();

// Synchronize migrations
await migrateSync();
```

## License

MIT
