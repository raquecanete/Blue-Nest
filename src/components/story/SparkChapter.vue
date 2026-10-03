<script setup lang="ts">
defineProps<{
  copy: {
    chapter: string
    studio: string
    headline: string[]
    intro: string
    smallIdea: string
    scrollCue: string
    signoff: string
  }
}>()

const emit = defineEmits<{ navigate: [path: string] }>()
</script>

<template>
  <section id="top" class="story-chapter story-spark" aria-labelledby="spark-title">
    <div class="story-chapter-label">{{ copy.chapter }}</div>
    <div class="spark-layout">
      <div class="spark-copy">
        <p class="story-eyebrow"><span class="status-dot"></span>{{ copy.studio }}</p>
        <h1 id="spark-title" class="story-split-title">
          <span v-for="line in copy.headline" :key="line" class="story-line-mask">
            <span data-spark-line>{{ line }}</span>
          </span>
        </h1>
        <p class="spark-small-idea">{{ copy.smallIdea }}</p>
        <div class="spark-bottom">
          <p>{{ copy.intro }}</p>
          <button class="story-round-link" type="button" aria-label="Explore the story" @click="emit('navigate', '/work')">
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </div>
      <div class="spark-art" aria-label="A browser window nestled in woven lines" role="img">
        <span class="spark-art-caption">BUILT WITH INTENTION <i>EST. MMXVIII</i></span>
        <svg class="spark-nest-lines" viewBox="0 0 720 570" fill="none" aria-hidden="true">
          <path d="M46 130C114 423 227 508 359 508S604 421 674 130" />
          <path d="M4 183C90 448 220 538 360 538S630 448 716 183" />
          <path d="M69 81C127 365 237 477 360 477S593 365 651 81" />
          <path d="M135 44C174 313 268 443 360 443S546 313 585 44" />
          <path d="M201 22C224 277 300 412 360 412S496 277 519 22" />
          <path d="M267 10C279 242 329 381 360 381S441 242 453 10" />
          <path d="M46 130C250 205 470 205 674 130" />
          <path d="M4 183C233 266 487 266 716 183" />
          <path d="M69 81C272 157 448 157 651 81" />
          <path d="M40 275C240 335 480 335 680 275" />
          <path d="M111 355C267 394 453 394 609 355" />
          <path d="M185 420C293 446 427 446 535 420" />
          <path d="M135 44C270 92 450 92 585 44" />
          <path d="M201 22C292 51 428 51 519 22" />
          <path d="M267 10C324 25 396 25 453 10" />
        </svg>
        <div class="spark-browser-mark" aria-hidden="true">
          <div><i></i><i></i><i></i></div>
          <span></span>
        </div>
        <span class="spark-art-index">BN—001</span>
      </div>
    </div>
    <div class="spark-footer">
      <span>{{ copy.signoff }}</span>
      <span class="spark-scroll-cue">{{ copy.scrollCue }} <b>↓</b></span>
      <span>WORKING EVERYWHERE, FROM BROOKLYN</span>
    </div>
  </section>
</template>
