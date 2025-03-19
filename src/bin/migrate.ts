#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { migrateDown, migrateSync, migrateUp } from '../index.js';
import { logger } from '../logger.js';
import { template } from '../constants.js';

(async () => {
  const command = process.argv[2];
  if (command === 'make') {
    const name = process.argv[3];
    if (!name) {
      logger.error('Provide a migration name\n');
      process.exit(1);
    }
    const filename = path.join(process.cwd(), `migrations/${name}.sql`);
    await fs.writeFile(filename, template);
    logger.info(`Migration ${filename} created`);
  } else if (command === 'up') {
    await migrateUp();
  } else if (command === 'down') {
    await migrateDown();
  } else if (command === 'sync') {
    await migrateSync();
  } else {
    logger.error(`Unknown command: ${command}\n`);
    process.exit(1);
  }
})();
