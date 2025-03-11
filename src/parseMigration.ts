const matcher = new RegExp(
  [
    `-- Up Migration\\s*\\n`,
    `([\\s\\S]*)`,
    `-- Down Migration\\s*\\n`,
    `([\\s\\S]*)`,
  ].join(''),
);
export function parseMigration(content: string) {
  const match = content.match(matcher);

  if (match === null) throw new Error('Invalid migration file');

  return { up: match[1].trim(), down: match[2].trim() };
}
