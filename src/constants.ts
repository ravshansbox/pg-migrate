export const {
  DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/postgres',
} = process.env;

export const template = `
-- Up Migration
--
-- Down Migration
--
`.trim();
