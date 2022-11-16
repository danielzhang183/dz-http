import { basename, parse } from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import YAML from 'js-yaml'
import { genArrayFromRaw, genObjectFromRaw } from 'knitwork'

function objectMap<K extends string, V, NK = K, NV = V>(obj: Record<K, V>, fn: (key: K, value: V) => [NK, NV] | undefined): Record<K, V> {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => fn(k as K, v as V))
      .filter(notNullish),
  )
}

function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
  return v != null
}

async function run() {
  const code = genArrayFromRaw(
    fg.sync('guides/**/*.{md,vue}')
      .map((file) => {
        const ext = parse(file).ext
        const yml = `${file.slice(0, -ext.length)}.yml`
        const data: any = fs.existsSync(yml)
          ? YAML.load(fs.readFileSync(yml, 'utf-8'))
          : {}
        return genObjectFromRaw({
          ...objectMap({
            type: 'guide',
            name: basename(file, ext),
            title: basename(file, ext),
            ...data,
          }, (k, v) => [k, JSON.stringify(v)]),
          component: `() => import('../${file}')`,
        })
      }),
  )

  fs.writeFileSync('data/guide-index.ts',
    `
import type { GuideItem } from 'types'

export const guideIndex: GuideItem[] = ${code}

`, 'utf-8')
}

run()
