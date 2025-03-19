#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { migrateDown, migrateSync, migrateUp } from '../index.js';
import { logger } from '../logger.js';

const template = `
-- Up Migration
--
-- Down Migration
--
`.trim();

const command = process.argv[2];

(async () => {
  if (command === 'make') {
    const name = process.argv[3];
    if (!name) {
      logger.error('Provide a migration name\n');
      process.exit(1);
    }
    await fs.writeFile(
      path.join(process.cwd(), `migrations/${name}.sql`),
      template,
    );
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
