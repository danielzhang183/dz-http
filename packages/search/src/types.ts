export interface DocItem {
  type: 'doc' | 'mdn'
  title: string
  url: string
  summary?: string
}

export type HeaderCategory = 'common' | 'entity' | 'request' | 'respone'

export interface HeaderItem {
  type: 'header'
  name: string
  desc: string
  category: HeaderCategory
}

export interface CodeItem {
  type: 'code'
  code: string
  desc: string
}

export interface SecurityItem {
  type: 'security'
}

export type ResultItem = DocItem | HeaderItem | CodeItem | SecurityItem
