import type { HttpGenerator } from '@dz-http/core'
import { uniq } from '@dz-http/core'
import LRU from 'lru-cache'
import type { AutoCompleteFunction, AutoCompleteTemplate, HttpAutocomplete, ParsedAutocompleteTemplate } from './types'

export function createAutocomplete(http: HttpGenerator): HttpAutocomplete {
  const templateCache = new Map<string, ParsedAutocompleteTemplate>()
  const cache = new LRU<string, string[]>({ max: 5000 })

  const templates: (AutoCompleteTemplate | AutoCompleteFunction)[] = []

  reset()

  return {
    suggest,
    suggestInFile,
    templates,
    cache,
    reset,
  }

  async function suggest(input: string) {
    if (input.length < 2)
      return []
    if (cache.has(input))
      return cache.get(input)!

    const processed = ''
    const result = processSuggestions(
      await Promise.all([
        suggestSelf(processed),
        suggestHttpCache(processed),
        suggestPost(processed),
        suggestSecurity(processed),
        suggestGuide(processed),
        suggestPreset(processed),
      ]),
    )

    cache.set(input, result)
    return result
  }

  function processSuggestions(suggestions: (string[] | undefined)[], prefix = '', suffix = '') {
    return uniq(suggestions.flat())
      .filter((i): i is string => !!(i && !i.match(/-$/)))
      .sort((a, b) => {
        const numA = +(a.match(/\d+$/)?.[0] || NaN)
        const numB = +(b.match(/\d+$/)?.[0] || NaN)
        if (!Number.isNaN(numA) && !Number.isNaN(numB))
          return numA - numB
        return a.localeCompare(b)
      })
      .map(i => prefix + i + suffix)
  }

  async function suggestSelf(input: string) {
  }

  async function suggestHttpCache(input: string) {

  }

  async function suggestPost(input: string) {

  }

  async function suggestGuide(input: string) {

  }

  async function suggestSecurity(input: string) {

  }

  async function suggestPreset(input: string) {

  }

  async function suggestInFile() {

  }

  function reset() {
    templateCache.clear()
    cache.clear()
    templates.length = 0
    templates.push()
  }
}
