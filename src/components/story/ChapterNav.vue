<script setup lang="ts">
import type Lenis from 'lenis'
import { storyTiming, type StoryChapter } from '../../data/story.js'

const props = defineProps<{
  chapters: StoryChapter[]
  activeId: string
  lenis: Lenis | null
}>()

function goToChapter(chapter: StoryChapter) {
  const target = document.getElementById(chapter.id)
  if (!target) return

  if (props.lenis) {
    props.lenis.scrollTo(target, {
      offset: Math.round(window.innerHeight * storyTiming.sceneOverlap),
      duration: 1.15,
    })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <nav class="story-chapter-nav" aria-label="Story chapters">
    <button
      v-for="chapter in chapters"
      :key="chapter.id"
      type="button"
      :class="{ 'is-active': activeId === chapter.id }"
      :aria-current="activeId === chapter.id ? 'step' : undefined"
      :aria-label="`Chapter ${chapter.number}: ${chapter.label}`"
      @click="goToChapter(chapter)"
    >
      <span class="story-nav-dot" aria-hidden="true"></span>
      <span class="story-nav-label">{{ chapter.label }}</span>
    </button>
  </nav>
</template>
