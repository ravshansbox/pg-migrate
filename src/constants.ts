import { EOL } from 'node:os'

export const {
  DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/postgres',
} = process.env

export const template = `-- Up${EOL}-- ${EOL}-- Down${EOL}-- ${EOL}`
