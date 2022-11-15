<script lang="ts" setup>
import type { Member } from '~/types'

const props = defineProps<{
  members?: Member[]
}>()

const isIcon = (str: string) => str.startsWith('i-')
console.log(props.members)
</script>

<template>
  <div class="member-container">
    <article
      v-for="member in members"
      v-if="members && members.length"
      :key="member.name"
      flex-col rounded-3 bg-truegray-50 dark:bg-dark-800
    >
      <div
        flex-col justify-center items-center
        p-8
      >
        <figure w-16 h-16 rounded-50 overflow-hidden my--0 ma>
          <img object-fit :src="member.avatar">
        </figure>

        <div pt-5 text-center>
          <div font-bold text-base>
            {{ member.name }}
          </div>
          <div text-sm font-normal opacity-50>
            {{ member.title }}
          </div>
          <div flex justify-center items-center gap2 pt-2>
            <a
              v-for="item in member.links"
              :key="item.link"
              :href="item.link"
              target="_blank"
            >
              <div v-if="isIcon(item.icon)" :class="item.icon" />
              <img v-else :src="item.icon">
            </a>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.member-container {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit,minmax(224px,1fr));
}

.member-container figure {
  margin: 0 auto;
}

.member-container a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
  border-bottom: unset;
}

.member-container a:hover {
  opacity: 1;
  text-decoration-color: inherit;
  border-bottom: unset;
}
</style>
