#!/usr/bin/env node
import { migrateUp, migrateDown } from '../lib.js';

const command = process.argv[2];

if (command === 'up') {
  await migrateUp();
} else if (command === 'down') {
  await migrateDown();
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
