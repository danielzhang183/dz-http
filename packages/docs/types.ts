import type { Component } from 'vue'

export interface DocItem {
  type: 'mdn' | 'resource'
  title: string
  url: string
  summary?: string
  subType?: string
}

// export interface RuleItem {
//   type: 'rule'
//   class: string
//   css?: string
//   body?: string
//   context?: RuleContext
//   colors?: string[]
//   features?: string[]
//   layers?: string[]
// }

export interface SecurityItem {
  type: 'security'
  name: string
  title: string
  summary?: string
  keywords?: string[]
  component: () => Promise<{ default: Component }>
}

export type ResultItem = DocItem | SecurityItem
