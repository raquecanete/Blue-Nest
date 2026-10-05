<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { siteCopy } from '../data/story.js'

const emit = defineEmits<{ navigate: [path: string] }>()
const menuOpen = ref(false)
const menuRoot = ref<HTMLElement | null>(null)
const menuToggle = ref<HTMLButtonElement | null>(null)

const links = [
  { label: siteCopy.navigation.work, href: '/work#projects' },
  { label: siteCopy.navigation.about, href: '/about#about' },
  { label: siteCopy.navigation.services, href: '/services' },
  { label: siteCopy.navigation.people, href: '/people#team' },
  { label: siteCopy.navigation.contact, href: '/contact#contact' },
]

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    menuToggle.value?.focus()
  }
}

function handlePointerDown(event: PointerEvent) {
  if (event.target instanceof Node && !menuRoot.value?.contains(event.target)) {
    menuOpen.value = false
  }
}

function navigate(path: string) {
  menuOpen.value = false
  menuToggle.value?.focus()
  emit('navigate', path)
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handlePointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handlePointerDown)
})
</script>

<template>
  <div ref="menuRoot" class="story-floating-menu is-visible" :class="{ 'is-open': menuOpen }">
    <button
      ref="menuToggle"
      id="site-floating-menu-toggle"
      type="button"
      class="story-floating-menu-toggle"
      :aria-expanded="menuOpen"
      aria-controls="site-floating-menu-panel"
      :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
      @click="menuOpen = !menuOpen"
    >
      <span class="story-floating-menu-bars" aria-hidden="true">
        <i></i><i></i><i></i>
      </span>
      <span class="story-floating-menu-label">Menu</span>
    </button>

    <nav
      id="site-floating-menu-panel"
      class="story-floating-menu-panel"
      :aria-label="siteCopy.navigation.mainLabel"
      :aria-hidden="!menuOpen"
      :inert="!menuOpen"
    >
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        @click.prevent="navigate(link.href)"
      >
        <span>{{ link.label }}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </nav>
  </div>
</template>
