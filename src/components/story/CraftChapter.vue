<script setup lang="ts">
import type { StoryProject } from '../../data/story.js'

defineProps<{
  projects: StoryProject[]
  copy: {
    chapter: string
    title: string[]
    aside: string
    browserAddress: string
    viewLabel: string
  }
}>()

const emit = defineEmits<{ navigate: [path: string] }>()
</script>

<template>
  <section id="story-craft" class="story-chapter story-craft" aria-labelledby="craft-title">
    <div class="story-chapter-label">{{ copy.chapter }}</div>
    <div class="craft-heading">
      <h2 id="craft-title">
        <span v-for="line in copy.title" :key="line" class="story-line-mask">
          <span data-craft-heading-line>{{ line }}</span>
        </span>
      </h2>
      <p>{{ copy.aside }}</p>
    </div>
    <div class="craft-frames">
      <a
        v-for="(project, index) in projects"
        :key="project.slug"
        class="craft-frame"
        :href="`/work/${project.slug}`"
        :data-craft-frame="index"
        :aria-label="`${copy.viewLabel}: ${project.name}`"
        data-cursor="View"
        @click.prevent="emit('navigate', `/work/${project.slug}`)"
      >
        <div class="craft-browser">
          <div class="craft-browser-chrome">
            <span class="browser-dots"><i></i><i></i><i></i></span>
            <span>{{ copy.browserAddress }}</span>
            <span aria-hidden="true">•••</span>
          </div>
          <div class="craft-browser-window">
            <img :src="project.image" :alt="project.label" :data-project-image="index" />
          </div>
        </div>
        <div class="craft-caption">
          <span class="craft-number">{{ project.number }}</span>
          <div>
            <small>{{ project.category }}</small>
            <h3>{{ project.name }}</h3>
            <p>{{ project.outcome }}</p>
          </div>
          <span class="craft-open" aria-hidden="true">↗</span>
        </div>
      </a>
    </div>
    <div class="craft-counter"><span data-project-current>01</span><i></i><span>{{ String(projects.length).padStart(2, '0') }}</span></div>
  </section>
</template>
