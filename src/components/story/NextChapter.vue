<script setup lang="ts">
defineProps<{
  copy: {
    chapter: string
    title: string[]
    intro: string
    cta: string
    email: string
    marquee: string
    backToTop: string
  }
}>()

const emit = defineEmits<{
  navigate: [path: string]
  backToTop: []
}>()
</script>

<template>
  <section id="story-next" class="story-chapter story-next" aria-labelledby="next-title">
    <div class="story-chapter-label">{{ copy.chapter }}</div>
    <svg class="next-woven-lines" viewBox="0 0 720 400" fill="none" aria-hidden="true">
      <path d="M20 22C90 280 230 370 360 370S630 280 700 22" />
      <path d="M0 80C88 310 228 395 360 395S632 310 720 80" />
      <path d="M88 4C140 244 244 342 360 342S580 244 632 4" />
      <path d="M20 22C220 90 500 90 700 22M0 80C214 144 506 144 720 80M42 190C228 237 492 237 678 190" />
      <path d="M160 300C280 330 440 330 560 300" />
    </svg>
    <div class="next-copy">
      <p class="story-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
      <h2 id="next-title">
        <span v-for="line in copy.title" :key="line" class="story-line-mask">
          <span data-next-heading-line>{{ line }}</span>
        </span>
      </h2>
      <p class="next-intro">{{ copy.intro }}</p>
      <a class="next-cta" href="/contact#contact" data-magnetic @click.prevent="emit('navigate', '/contact#contact')">
        {{ copy.cta }} <span aria-hidden="true">↗</span>
      </a>
      <a class="next-email" :href="`mailto:${copy.email}`">{{ copy.email }}</a>
    </div>
    <div class="next-marquee" aria-hidden="true">
      <span v-for="index in 4" :key="index">{{ copy.marquee }}</span>
    </div>
    <button class="next-back-top" type="button" @click="emit('backToTop')">
      <span aria-hidden="true">↑</span>{{ copy.backToTop }}
    </button>
  </section>
</template>
