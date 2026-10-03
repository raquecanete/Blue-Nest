<script setup lang="ts">
import type { StoryPerson } from '../../data/story.js'

defineProps<{
  people: StoryPerson[]
  copy: { chapter: string; title: string[]; aside: string }
}>()

const emit = defineEmits<{ navigate: [path: string] }>()
</script>

<template>
  <section id="story-team" class="story-chapter story-team" aria-labelledby="team-title">
    <div class="story-chapter-label">{{ copy.chapter }}</div>
    <div class="team-chapter-heading">
      <h2 id="team-title">
        <span v-for="line in copy.title" :key="line" class="story-line-mask">
          <span data-team-heading-line>{{ line }}</span>
        </span>
      </h2>
      <p>{{ copy.aside }}</p>
    </div>
    <div class="team-frames">
      <article v-for="(person, index) in people" :key="person.name" class="team-frame" :data-team-frame="index">
        <div class="team-photo">
          <img :src="person.image" :alt="person.alt" :class="{ 'team-photo-cover': person.imageFit === 'cover' }" />
          <span class="team-photo-index">BLUE NEST · {{ String(index + 1).padStart(2, '0') }}</span>
        </div>
        <div class="team-profile">
          <p class="story-eyebrow">THE PEOPLE</p>
          <h3>{{ person.name }}</h3>
          <span class="team-role">{{ person.role }}</span>
          <p class="team-bio">{{ person.bio }}</p>
          <a class="team-social-link" :href="person.contact">Say hello <span aria-hidden="true">↗</span></a>
        </div>
      </article>
    </div>
    <div class="team-progress">
      <span data-team-current>01</span><i></i><span>{{ String(people.length).padStart(2, '0') }}</span>
    </div>
    <button class="team-directory-link" type="button" @click="emit('navigate', '/people#team')">
      Meet the whole team <span aria-hidden="true">↗</span>
    </button>
  </section>
</template>
