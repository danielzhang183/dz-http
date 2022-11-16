import type { Component } from 'vue'

export interface DocItem {
  type: 'doc' | 'mdn' | 'resource'
  title: string
  url: string
  summary?: string
  subType?: string
}

export type HeaderCategory = 'common' | 'entity' | 'request' | 'respone'

export interface HeaderItem {
  type: 'header'
  name: string
  summary: string
  category: HeaderCategory
}

export interface CodeItem {
  type: 'code'
  code: string
  summary: string
}

export interface GuideItem {
  type: 'guide'
  name: string
  title: string
  summary?: string
  keywords?: string[]
  component: () => Promise<{ default: Component }>
}

export type ResultItem = DocItem | GuideItem
