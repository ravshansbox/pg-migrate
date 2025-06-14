import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Ensure dist/cjs directory exists
mkdirSync('dist/cjs', { recursive: true });

// Create package.json for CJS build
writeFileSync(
  join('dist/cjs/package.json'),
  JSON.stringify({ type: 'commonjs' }, null, 2)
);

console.log('Post-build: Created CJS package.json');
