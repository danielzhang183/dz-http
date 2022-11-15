<script setup lang="ts">
import { breakpoints, isModalOpen, searchResult, selectIndex } from '~/logics/state'

const lg = breakpoints.lg

const modal = computed<boolean>({
  get() {
    return isModalOpen.value && !!searchResult.value[selectIndex.value]
  },
  set(v) {
    isModalOpen.value = v
  },
})
</script>

<template>
  <div grid="~ lg:cols-2 gap2" px8 h-full of-hidden>
    <div h-full grid="~ rows-[min-content_min-content_1fr]" of-hidden>
      <Search />
    </div>
    <!-- <template v-if="lg">
      <DetailsResult :item="searchResult[selectIndex]" />
    </template>
    <template v-else>
      <Modal v-model="modal">
        <DetailsResult :item="searchResult[selectIndex]" />
      </Modal>
    </template> -->
  </div>
</template>
