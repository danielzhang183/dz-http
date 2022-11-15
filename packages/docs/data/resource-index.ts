import type { DocItem } from 'types'

export const resourceIndex = ref<DocItem[]>([])

import('./resource-index.json')
  .then((r) => {
    resourceIndex.value = (r.default as DocItem[])
      .map((i) => {
        i.type = 'resource'
        return i
      })
  })
