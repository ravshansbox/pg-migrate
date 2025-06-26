import fs from 'node:fs/promises'
import path from 'path'

export async function getAllMigrations() {
  const allMigrations = await fs.readdir(path.join(process.cwd(), 'migrations'))
  return allMigrations.filter(migration => migration.endsWith('.sql'))
}
