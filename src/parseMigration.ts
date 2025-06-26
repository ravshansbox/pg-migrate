const matcher = new RegExp(
  [`-- Up\\s*\\n`, `([\\s\\S]*)`, `-- Down\\s*\\n`, `([\\s\\S]*)`].join(''),
)
export function parseMigration(content: string) {
  const match = content.match(matcher)

  if (match === null) throw new Error('Invalid migration file')

  return { up: match[1].trim(), down: match[2].trim() }
}
