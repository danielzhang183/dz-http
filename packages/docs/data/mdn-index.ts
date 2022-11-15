import type { DocItem } from 'types'

export const mdnIndex = ref<DocItem[]>([])

import('./mdn-index.json')
  .then((r) => {
    mdnIndex.value = (r.default as DocItem[])
      .map((i) => {
        i.type = 'mdn'
        return i
      })
  })
