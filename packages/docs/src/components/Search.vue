<script setup lang="ts">
import { input, isModalOpen, isSearching, searchResult, searcher, selectIndex } from '~/logics/state'

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
  }
  catch (e) {
    console.error(e)
  }
  isSearching.value = false

  selectIndex.value = 0
  isModalOpen.value = false

  await router.replace({
    path: '/basic',
    query: input.value
      ? { s: input.value }
      : undefined,
  })
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
  </div>
</template>
