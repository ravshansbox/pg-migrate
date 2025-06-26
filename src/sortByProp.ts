export function sortByProp<T extends string, U extends Record<T, unknown>>(
  prop: T,
) {
  return (a: U, b: U) => (a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0)
}
