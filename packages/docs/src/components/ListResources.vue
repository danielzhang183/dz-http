<script setup lang="ts">
import type { DocItem } from 'types'
import { default as resourceIndex } from '../../data/resource-index.json'
import { capitalize } from '~/logics'

interface ResolveDocItem extends DocItem {
  icon: string
}

const props = defineProps<{
  resources?: Record<string, ResolveDocItem[]>
}>()

const ICON_MAP: Record<string, string> = {
  book: 'i-bi-book',
  video: 'i-ri-movie-line',
  blog: 'i-fa6-solid-blog',
}

function normalizeResources(resources: DocItem[]): Record<string, ResolveDocItem[]> {
  const map: Record<string, ResolveDocItem[]> = {}

  for (const resource of resources) {
    if (!resource.subType)
      continue
    const subType = `${capitalize(resource.subType)}s`
    if (!map[subType])
      map[subType] = []
    map[subType].push(Object.assign(resource, { icon: ICON_MAP[resource.subType] }))
  }

  return map
}

const resources = computed(() => props.resources || normalizeResources(resourceIndex as DocItem[]))
</script>

<template>
  <template v-for="key in Object.keys(resources)" :key="key">
    <h4 class="mt-10 font-bold">
      {{ key }}
    </h4>
    <div class="project-grid py-2 -mx-3 gap-2">
      <a
        v-for="item, idx in resources[key]"
        :key="idx"
        class="item relative flex items-center"
        :href="item.url"
        target="_blank"
        :class="!item.url ? 'opacity-0 pointer-events-none h-0 -mt-8 -mb-4' : ''"
        :title="item.title"
      >
        <div v-if="item.icon" class="pt-2 pr-5">
          <div class="text-3xl opacity-50" :class="item.icon || 'i-carbon-unknown'" />
        </div>
        <div class="flex-auto">
          <div cla ss="text-normal">{{ item.title }}</div>
          <div class="desc text-sm opacity-50 font-normal" v-html="item.summary" />
        </div>
      </a>
    </div>
  </template>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.project-grid a.item {
  padding: 0.8em 1em;
  background: transparent;
  font-size: 1.1rem;
}

.project-grid a.item:hover {
  background: #88888808;
}
</style>
