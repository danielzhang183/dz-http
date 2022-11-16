<script setup lang="ts">
import { input, isMobile, isModalOpen, isSearching, searchResult, searcher, selectIndex } from '~/logics/state'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { ResultItem } from '~~/types'

const route = useRoute()
const router = useRouter()
const inputEl = ref<HTMLInputElement>()
const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}

watch(
  () => route.query.s,
  async () => {
    input.value = String(route.query.s || '')
    await executeSearch()
  },
)

throttledWatch(
  input,
  executeSearch,
  { throttle: 100, immediate: true },
)

async function executeSearch() {
  if (input.value)
    isSearching.value = true

  try {
    searchResult.value = await searcher.search(input.value)
    console.log({ result: searchResult.value })
  }
  catch (e) {
    console.error(e)
  }
  isSearching.value = false

  selectIndex.value = 0
  isModalOpen.value = false

  await router.replace({
    path: '/interactive',
    query: input.value
      ? { s: input.value }
      : undefined,
  })
}

function clear() {
  router.push('/interactive')
  nextTick().then(() => inputEl?.value?.focus())
}

function openItem(item: ResultItem) {
  if (isMobile.value && !isModalOpen.value)
    isModalOpen.value = true
  else
    input.value = searcher.getItemId(item)
}

function selectItem(item: ResultItem) {
  const index = searchResult.value.indexOf(item)
  if (index < 0)
    return
  if (selectIndex.value !== index) {
    selectIndex.value = index
    if (isMobile.value && !isModalOpen.value)
      isModalOpen.value = true
  }
  else {
    openItem(item)
  }
}
</script>

<template>
  <div relative border="~ rounded base" shadow font-200 text-2xl>
    <input
      ref="inputEl"
      v-model="input"
      v-focus
      type="text"
      aria-label="Type to explore"
      placeholder="Type to explore..."
      autocomplete="off" w-full
      p="x6 y4"
      bg-transparent border-none
      class="!outline-none"
    >
    <button
      v-if="input"
      absolute flex right-2 w-10 top-2 bottom-2 text-xl op30 hover:op90
      aria-label="Clear search"
      @click="clear()"
    >
      <span i-carbon-close ma block aria-hidden="true" />
    </button>

    <div v-if="searchResult.length || isSearching" border="l b r base" mx2 of-auto>
      <template v-if="isSearching">
        <ItemBase>
          <template #badge>
            <div i-carbon-circle-dash w-5 h-5 animate-spin ma />
          </template>
          <template #title>
            Searching...
          </template>
        </ItemBase>
        <div divider />
      </template>
      <template v-for="(i, idx) of searchResult" :key="idx">
        <ResultItem
          :item="i"
          :active="selectIndex === idx"
          @click="selectItem(i)"
        />
        <div divider />
      </template>
    </div>
    <div v-else p10>
      <div op40 italic mb5>
        No result found
      </div>
      <div row justify-center>
        <button btn @click="clear()">
          Clear search
        </button>
      </div>
    </div>
  </div>
</template>
