#!/usr/bin/env node
import { migrateDown, migrateSync, migrateUp } from '../index.js';

const command = process.argv[2];

(async () => {
  if (command === 'up') {
    await migrateUp();
  } else if (command === 'down') {
    await migrateDown();
  } else if (command === 'sync') {
    await migrateSync();
  } else {
    process.stderr.write(`Unknown command: ${command}\n`);
    process.exit(1);
  }
})();
