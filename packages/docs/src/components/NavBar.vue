<script setup lang="ts">
import { isDark } from '~/logics'
</script>

<template>
  <header class="header z-40">
    <router-link
      class="w-10 h-10 absolute lg:fixed m-6 select-none outline-none"
      to="/"
      focusable="false"
    >
      <img v-show="isDark" src="/logo-dark.svg?url" alt="logo">
      <img v-show="!isDark" src="/logo.svg?url" alt="logo">
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <router-link to="/interactive" title="Interactive">
          <span class="lt-md:hidden">Interactive</span>
          <div i-carbon-load-balancer-network md:hidden />
        </router-link>
        <router-link to="/posts" title="Posts">
          <span class="lt-md:hidden">Posts</span>
          <div i-ri-article-line md:hidden />
        </router-link>
        <router-link to="/security" title="Security">
          <span class="lt-md:hidden">Security</span>
          <div i-carbon-security md:hidden />
        </router-link>
        <router-link to="/resources" title="Resources">
          <span class="lt-md:hidden">Resources</span>
          <div i-ep-collection md:hidden />
        </router-link>
        <a href="https://github.com/danielzhang183/dz-http" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
