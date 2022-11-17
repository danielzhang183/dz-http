export function uniq<T>(value: T[]): T[] {
  return Array.from(new Set(value))
}
