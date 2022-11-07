import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Post {
  path: string
  title: string
  date: string
  type?: string
  lang?: string
  desc?: string
  duration?: string
}

export interface Member {
  avatar: string
  name: string
  title: string
  links?: Array<{
    icon: string
    link: string
  }>
}

export interface SubNav {
  name: string
  link: string
}
