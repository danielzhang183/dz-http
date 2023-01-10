export function uniq<T>(value: T[]): T[] {
  return Array.from(new Set(value))
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
