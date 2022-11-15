import Fuse from 'fuse.js'
import { createAutocomplete } from './autocomplete'
import type { ResultItem } from './types'

export function createSearch() {
  const ac = createAutocomplete()

  const fuseCollection: ResultItem[] = []

  const fuse = new Fuse<ResultItem>(
    fuseCollection,
    {
      keys: [

      ],
      isCaseSensitive: false,
      ignoreLocation: true,
      includeScore: true,
    },
  )

  let _fusePrepare: Promise<void> | undefined
  async function search(input: string) {
    _fusePrepare = _fusePrepare || prepareFuse()
    await _fusePrepare

    input = input.trim()

    return input
  }

  async function prepareFuse() {
    await Promise.all(Array.from(await enumerateAutocomplete()))
      // .map(async i => await generateFor(i)) 
  }

  async function enumerateAutocomplete() {
    const matched = new Set<string>()
    const a2z = Array.from('abcdefghijklmnopqrstuvwxyz')
    const a2zd = [...a2z, '-']

    const keys = a2z.flatMap(i => [
      i,
      ...a2zd.map(j => `${i}${j}`),
    ])

    await Promise.all(keys.map(key =>
      ac
        // .suggest(key)
        // .then(i => i.forEach(j => matched.add(j))),
    ))

    return matched
  }

  async function generateFor() {

  }

  return {
    search,
  }
}
