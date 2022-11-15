import { URLSearchParams } from 'url'
import { breakpointsTailwind } from '@vueuse/core'
import { createSearch } from '@dz-http/search'
import type { ResultItem } from '~/types'

export const searcher = createSearch()

const initParams = new URLSearchParams(location.search)

export const input = ref(initParams.get('s') || '')
export const selectIndex = ref(0)
export const isSearching = ref(false)
export const isModalOpen = ref(true)
export const searchResult = shallowRef<ResultItem[]>([])

export const breakpoints = useBreakpoints(breakpointsTailwind)
