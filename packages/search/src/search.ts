import Fuse from 'fuse.js'
import type { Ref } from 'vue'
import { computed } from 'vue'
import type { DocItem, GuideItem, ResultItem } from './types'

export interface SearchState {
  docs: Ref<DocItem[]>
  resources: Ref<DocItem[]>
  guides: GuideItem[]
  limit?: number
}

export function createSearch({ docs, resources, guides, limit = 50 }: SearchState) {
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

    return input
  }

  function getItemId(item: ResultItem) {
    return `${item.type}:${item.title}`
  }

  return {
    search,
    getItemId,
  }
}
