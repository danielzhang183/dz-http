import Fuse from 'fuse.js'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { notNull, uniq } from '@dz-http/core'
import type { HttpGenerator } from '@dz-http/core'
import { createAutocomplete } from './autocomplete'
import type { DocItem, GuideItem, ResultItem, RuleItem } from './types'

export interface SearchState {
  http: HttpGenerator
  docs: Ref<DocItem[]>
  resources: Ref<DocItem[]>
  guides: GuideItem[]
  limit?: number
}

export function createSearch({ http, docs, resources, guides, limit = 50 }: SearchState) {
  const ac = createAutocomplete(http)
  const matchedMap = reactive(new Map<string, RuleItem>())
  const featuresMap = reactive(new Map<string, Set<RuleItem>>())
  let fuseCollection: ResultItem[] = []

  const fuse = new Fuse<ResultItem>(
    fuseCollection,
    {
      keys: [
        {
          name: 'class',
          weight: 0.5,
        },
        {
          name: 'body',
          weight: 0.4,
        },
        {
          name: 'title',
          weight: 0.3,
        },
        {
          name: 'keywords',
          weight: 0.3,
        },
      ],
      isCaseSensitive: false,
      ignoreLocation: true,
      includeScore: true,
    },
  )
  const docsFuse = computed(() => new Fuse<ResultItem>(
    docs.value,
    {
      keys: ['title', 'summary'],
      isCaseSensitive: false,
    },
  ))
  const resourcesFuse = computed(() => new Fuse<ResultItem>(
    resources.value,
    {
      keys: ['title', 'summary'],
      isCaseSensitive: false,
    },
  ))
  const guidesFuse = new Fuse<ResultItem>(
    guides,
    {
      keys: ['title'],
      isCaseSensitive: false,
    },
  )

  async function search(input: string) {
    input = input.trim()

    // mdn
    if (input.match(/^mdn:/)) {
      input = input.slice(4).trim()
      if (!input)
        return docs.value.slice(0, limit)
      return docsFuse.value.search(input, { limit }).map(i => i.item)
    }

    // guide
    if (input.match(/^guide:/)) {
      input = input.slice(6).trim()
      if (!input)
        return guides.slice(0, limit)
      return guidesFuse.search(input, { limit }).map(i => i.item)
    }

    // resource
    if (input.match(/^resource:/)) {
      input = input.slice(9).trim()
      if (!input)
        return resources.value.slice(0, limit)
      return resourcesFuse.value.search(input, { limit }).map(i => i.item)
    }

    const parts = input.split(/\s/g).filter(notNull)
    const extact = await generateForMutiple(parts)

    await suggestMultiple([
      ...parts,
    ]).then(r => generateForMutiple(r))

    const searchResult = uniq([
      ...fuse.search(input, { limit: limit * 2 }),
      ...parts.flatMap(i => fuse.search(i, { limit: limit * 2 })),
    ]
      .filter(i => i.score! <= 0.5)
      .sort((a, b) => a.score! - b.score!)
      .map(i => i.item))
      .slice(0, limit)

    return uniq([
      ...extact,
      ...searchResult,
    ].filter(notNull))
  }

  async function suggestMultiple(str: string[]) {
    return uniq((await Promise.all(str.map(i => ac.suggest(i))))).flat()
  }

  async function generateForMutiple(str: string[]) {
    return uniq(await Promise.all(str.map(i => generateFor(i)))).filter(notNull)
  }

  const _generatePromiseMap = new Map<string, Promise<ResultItem | undefined>>()
  async function generateFor(input: string) {
    if (!_generatePromiseMap.has(input))
      _generatePromiseMap.set(input, _generateFor(input).catch(e => console.error(e)) as any)
    return _generatePromiseMap.get(input)
  }

  // === core search function ===
  async function _generateFor(input: string) {
    if (matchedMap.has(input))
      return matchedMap.get(input)

    const token = await http.parseToken(input)
    if (!token?.length)
      return
    const features = getFeatureUsage()

    matchedMap.set(input, {})
    const item = matchedMap.get(input)!

    features.forEach((i) => {
      if (!featuresMap.has(i))
        featuresMap.set(i, new Set())
      featuresMap.get(i)!.add(item)
    })

    if (!fuseCollection.includes(item))
      fuse.add(item)

    return item
  }

  function getFeatureUsage(input: string) {
    const codes = uniq([...input.matchAll(/^\s+(\d+)/mg)].map(i => i[1]))
    const portocals = uniq([...input.matchAll(/\b(\w+)\(/mg)].map(i => `${i[1]}()`))
    const headers = uniq([...input.matchAll(/\:([\w-]+)/mg)].map(i => `:${i[1]}`))
    return [...codes, ...portocals, ...headers]
      .filter(i => docs.value.find(s => s.title === i))
  }

  function getItemId(item: ResultItem) {
    return `${item.type}:${item.title}`
  }

  function getSearchCount() {
    return fuseCollection.length
  }

  function reset() {
    matchedMap.clear()
    featuresMap.clear()
    ac.reset()
    _generatePromiseMap.clear()
    fuseCollection = [...guides, ...docs.value, ...resources.value]
    fuse.setCollection(fuseCollection)
  }

  function getPresetOfCode() {

  }

  function getPresetOfPortocol() {

  }

  function getPresetOfHeader() {

  }

  return {
    reset,
    search,
    fuse,
    getItemId,
    getSearchCount,
    getPresetOfCode,
    getPresetOfPortocol,
    getPresetOfHeader,
  }
}
