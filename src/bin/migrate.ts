#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { migrateDown, migrateSync, migrateUp } from '../index.js'
import { logger } from '../logger.js'
import { template } from '../constants.js'

const dir = path.join(process.cwd(), 'migrations')

;(async () => {
  const command = process.argv[2]
  if (command === 'make') {
    const migrationName = process.argv[3]
    if (!migrationName) {
      logger.error('Provide a migration name\n')
      process.exit(1)
    }
    try {
      await fs.stat(dir)
    } catch (_error) {
      await fs.mkdir(dir, { recursive: true })
      logger.info(`Created migrations directory: ${dir}`)
    }
    const filename = `${migrationName}.sql`
    await fs.writeFile(path.join(dir, filename), template)
    logger.info(`Migration ${path.join(dir, filename)} created`)
  } else if (command === 'up') {
    await migrateUp()
  } else if (command === 'down') {
    await migrateDown()
  } else if (command === 'sync') {
    await migrateSync()
  } else {
    logger.error(`Unknown command: ${command}\n`)
    process.exit(1)
  }
})()
