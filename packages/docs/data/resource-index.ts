import type { DocItem } from 'types'

export const resourceIndex = ref<DocItem[]>([])

import('./resource-index.json')
  .then((r) => {
    resourceIndex.value = (r.default as DocItem[])
      .map((i) => {
        i.subType = i.type
        i.type = 'resource'
        return i
      })
  })
