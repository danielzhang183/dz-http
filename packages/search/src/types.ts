import type { Component } from 'vue'
import type LRU from 'lru-cache'
import type { AutoCompleteFunction, SuggestResult } from '@dz-http/core'

export interface DocItem {
  type: 'doc' | 'mdn' | 'resource'
  title: string
  url: string
  summary?: string
  subType?: string
}

export interface RuleItem {
  type: 'rule'
  title: string
  body: string
  features?: string[]
  urls?: string[]
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

export type ResultItem = DocItem | RuleItem | GuideItem

export type AutocompleteTemplatePart = AutocompleteTemplateStatic | AutocompleteTemplateGroup | AutocompleteTemplateTheme

export interface AutocompleteTemplateStatic {
  type: 'static'
  value: string
}

export interface AutocompleteTemplateGroup {
  type: 'group'
  values: string[]
}

export interface AutocompleteTemplateTheme {
  type: 'theme'
  objects: Record<string, unknown>[]
}

export interface ParsedAutocompleteTemplate {
  parts: AutocompleteTemplatePart[]
  suggest(input: string): string[] | undefined
}

export interface HttpAutocomplete {
  suggest: (input: string) => Promise<string[]>
  suggestInFile: (content: string, cursor: number) => Promise<SuggestResult>
  templates: (string | AutoCompleteFunction)[]
  cache: LRU<string, string[]>
  reset: () => void
}
