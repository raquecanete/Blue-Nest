<script setup lang="ts">
defineProps<{
  copy: {
    chapter: string
    title: string[]
    intro: string
    stats: Array<{ value: number; suffix: string; label: string }>
    values: Array<{ number: string; title: string; text: string }>
  }
}>()
</script>

<template>
  <section id="story-impact" class="story-chapter story-impact" aria-labelledby="impact-title">
    <div class="story-chapter-label">{{ copy.chapter }}</div>
    <div class="impact-heading">
      <h2 id="impact-title">
        <span v-for="line in copy.title" :key="line" class="story-line-mask">
          <span data-impact-heading-line>{{ line }}</span>
        </span>
      </h2>
      <p>{{ copy.intro }}</p>
    </div>
    <div class="impact-stats">
      <article v-for="stat in copy.stats" :key="stat.label" class="impact-stat">
        <strong :data-counter="stat.value" :data-suffix="stat.suffix">00</strong>
        <span>{{ stat.label }}</span>
      </article>
    </div>
    <div class="impact-values">
      <article v-for="value in copy.values" :key="value.number" class="impact-value">
        <span>{{ value.number }}</span>
        <h3>{{ value.title }}</h3>
        <p>{{ value.text }}</p>
      </article>
    </div>
  </section>
</template>
