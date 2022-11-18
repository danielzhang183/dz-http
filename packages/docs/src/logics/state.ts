// import { URLSearchParams } from 'url'
import { breakpointsTailwind } from '@vueuse/core'
import { createGenerator } from '@dz-http/core'
import { createSearch } from '@dz-http/search'
import type { ResultItem } from 'types'
import { guideIndex as guides } from '~~/data/guide-index'
import { resourceIndex as resources } from '~~/data/resource-index'
import { mdnIndex as docs } from '~~/data/mdn-index'

export const isCompact = useLocalStorage('http-interactive-compact', false)
export const toggleCompact = useToggle(isCompact)

export const http = createGenerator({}, defaultConfig)
export const searcher = createSearch({ docs, guides, resources })

// const initParams = new URLSearchParams(location.search)

export const input = ref('')
export const selectIndex = ref(0)
export const isSearching = ref(false)
export const isModalOpen = ref(true)
export const searchResult = shallowRef<ResultItem[]>([])

export const breakpoints = useBreakpoints(breakpointsTailwind)
export const isDesktop = breakpoints.lg
export const isMobile = ref(!!isDesktop)
