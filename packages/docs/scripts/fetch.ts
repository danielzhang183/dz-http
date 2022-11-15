import { $fetch } from 'ohmyfetch'
import pLimit from 'p-limit'
import fs from 'fs-extra'
import type { DocItem } from 'types'

const MDN = 'https://developer.mozilla.org'
const LANG = 'en-US'

async function run() {
  const searchIndex = (await $fetch<DocItem[]>(`${MDN}/${LANG}/search-index.json`))
    .filter(i => i.url.match(/\/http\//gi))

  const limit = pLimit(10)
  await Promise.all(
    searchIndex.map(i => limit(async () => {
      const data = await $fetch<any>(`${MDN}${i.url}/index.json`)
      i.summary = data?.doc?.summary
      i.title = i.title.replace(/\s+\(.*\)$/, '')
      i.url = MDN + i.url
      // eslint-disable-next-line no-console
      console.log(`got ${i.url}`)
    })),
  )
  await fs.writeJSON('./data/mdn-index.json', searchIndex, { spaces: 2 })
}

run()
