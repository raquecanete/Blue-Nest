<script setup lang="ts">
defineProps<{
  copy: {
    chapter: string
    eyebrow: string
    title: string[]
    intro: string
    manifesto: string[]
    services: Array<{ number: string; title: string; detail: string; type: string }>
  }
}>()
</script>

<template>
  <section id="story-nest" class="story-chapter story-nest" aria-labelledby="nest-title">
    <div class="story-chapter-label">{{ copy.chapter }}</div>
    <div class="nest-composition">
      <div class="nest-copy">
        <p class="story-eyebrow">{{ copy.eyebrow }}</p>
        <h2 id="nest-title" class="story-nest-heading">
          <span v-for="line in copy.title" :key="line" class="story-line-mask">
            <span data-nest-heading-line>{{ line }}</span>
          </span>
        </h2>
        <p class="nest-intro">{{ copy.intro }}</p>
        <div class="nest-services">
          <article v-for="service in copy.services" :key="service.number">
            <span>{{ service.number }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.detail }}</p>
            <small>{{ service.type }}</small>
          </article>
        </div>
      </div>
      <div class="nest-graphic" aria-hidden="true">
        <span class="nest-orbit nest-orbit-one"></span>
        <span class="nest-orbit nest-orbit-two"></span>
        <span class="nest-orbit nest-orbit-three"></span>
        <span class="nest-orbit nest-orbit-four"></span>
        <svg viewBox="0 0 420 300" fill="none">
          <path d="M24 48C60 196 121 260 210 260s150-64 186-212" />
          <path d="M4 83C52 220 126 286 210 286s158-66 206-203" />
          <path d="M66 24c27 126 81 203 144 203S327 150 354 24" />
          <path d="M24 48c108 35 264 35 372 0M4 83c108 38 304 38 412 0M50 145c100 29 220 29 320 0" />
        </svg>
        <div class="nest-mini-browser"><i></i><i></i><i></i><span></span></div>
        <i class="nest-float-shape nest-float-shape-one"></i>
        <i class="nest-float-shape nest-float-shape-two"></i>
        <i class="nest-float-shape nest-float-shape-three"></i>
        <i class="nest-float-shape nest-float-shape-four"></i>
      </div>
    </div>
    <div class="nest-manifesto" aria-label="Our principles">
      <p v-for="(line, index) in copy.manifesto" :key="line" :data-manifesto="index">{{ line }}</p>
    </div>
  </section>
</template>
