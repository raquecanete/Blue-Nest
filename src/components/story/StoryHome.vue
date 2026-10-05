<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'
import { chapters, people, projects, storyCopy, storyTiming } from '../../data/story.js'
import { useChapter } from '../../composables/useChapter'
import { useCounter } from '../../composables/useCounter'
import { useMagnetic } from '../../composables/useMagnetic'
import { useParallax } from '../../composables/useParallax'
import { useSplitReveal } from '../../composables/useSplitReveal'
import ChapterNav from './ChapterNav.vue'
import CraftChapter from './CraftChapter.vue'
import ImpactChapter from './ImpactChapter.vue'
import NestChapter from './NestChapter.vue'
import NextChapter from './NextChapter.vue'
import SparkChapter from './SparkChapter.vue'
import StoryCursor from './StoryCursor.vue'
import StoryPreloader from './StoryPreloader.vue'
import TeamChapter from './TeamChapter.vue'

const props = defineProps<{ lenis: Lenis | null }>()
const emit = defineEmits<{ navigate: [path: string] }>()

const root = ref<HTMLElement | null>(null)
const preloaderActive = ref(true)
const activeChapter = ref(chapters[0]?.id ?? 'story-spark')
let context: gsap.Context | undefined
let media: gsap.MatchMedia | undefined
let removeMagnetic = () => {}
let preloaderTimeline: gsap.core.Timeline | undefined
let handleResize = () => {}

function goToStoryChapter(chapterId: string) {
  const target = document.getElementById(chapterId)
  if (!target) return

  if (props.lenis) {
    props.lenis.scrollTo(target, {
      offset: Math.round(window.innerHeight * storyTiming.sceneOverlap),
      duration: 1.15,
      easing: (progress) => 1 - Math.pow(1 - progress, 4),
    })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

}

function goBackToTop() {
  if (props.lenis) {
    props.lenis.scrollTo(0, { duration: 1.8, easing: (progress) => 1 - Math.pow(1 - progress, 4) })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function setActive(id: string) {
  activeChapter.value = id
}

function buildDesktopStory() {
  const element = (id: string) => root.value?.querySelector<HTMLElement>(`#${id}`)
  const chapterOptions = (id: string, distanceScreens: number) => ({
    distanceScreens,
    active: () => setActive(id),
    snap: true,
  })

  const spark = element('top')
  if (spark) {
    useChapter(
      spark,
      (timeline) => {
        useSplitReveal(timeline, '[data-spark-line]')
        timeline.fromTo(
          '.spark-small-idea',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          0.22,
        )
        timeline.fromTo(
          '.spark-bottom',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          0.36,
        )
        useParallax(timeline, '.spark-nest-lines', 5, 0)
        timeline.fromTo(
          '.spark-browser-mark',
          { yPercent: 4, rotate: -4 },
          { yPercent: -4, rotate: 3, ease: 'none' },
          0,
        )
        timeline.addLabel('spark-revealed', 0.85)
      },
      chapterOptions('top', 1.05),
    )
  }

  const nest = element('story-nest')
  if (nest) {
    useChapter(
      nest,
      (timeline) => {
        useSplitReveal(timeline, '[data-nest-heading-line]')
        timeline.fromTo(
          '.nest-intro',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          0.2,
        )
        timeline.fromTo(
          '.nest-services article',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.42,
        )
        const manifesto = gsap.utils.toArray<HTMLElement>('[data-manifesto]')
        gsap.set(manifesto, { opacity: 0.2 })
        manifesto.forEach((line, index) => {
          timeline.to(
            line,
            { opacity: 1, duration: 0.22, ease: 'none' },
            0.18 + index * 0.25,
          )
        })
        timeline.to(
          '.nest-float-shape',
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 0.6,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power2.inOut',
          },
          0.18,
        )
        timeline.fromTo(
          '.nest-graphic svg path',
          { strokeDasharray: 700, strokeDashoffset: 700 },
          { strokeDashoffset: 0, duration: 0.8, stagger: 0.04, ease: 'power2.inOut' },
          0.3,
        )
        timeline.addLabel('nest-manifesto')
      },
      chapterOptions('story-nest', 1.4),
    )
  }

  const team = element('story-team')
  if (team) {
    const frames = gsap.utils.toArray<HTMLElement>('[data-team-frame]')
    gsap.set(frames, { opacity: 0, x: 48, scale: 0.97, pointerEvents: 'none' })
    if (frames[0]) gsap.set(frames[0], { opacity: 1, x: 0, scale: 1, pointerEvents: 'auto' })

    useChapter(
      team,
      (timeline) => {
        useSplitReveal(timeline, '[data-team-heading-line]')
        timeline.fromTo(
          '.team-chapter-heading > p',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.18,
        )
        frames.forEach((frame, index) => {
          const start = 0.35 + index * storyTiming.teamFrame
          const previousFrame = frames[index - 1]
          timeline.addLabel(`team-${index + 1}`, start)
          if (previousFrame) {
            timeline.set(previousFrame, { pointerEvents: 'none' }, start)
            timeline.set(frame, { pointerEvents: 'auto' }, start + 0.1)
            timeline.to(
              previousFrame,
              { opacity: 0, x: -34, scale: 0.94, duration: 0.3, ease: 'power2.inOut' },
              start,
            )
            timeline.fromTo(
              frame,
              { opacity: 0, x: 55, scale: 0.97, clipPath: 'inset(0 0 0 18%)' },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                clipPath: 'inset(0 0 0 0%)',
                duration: 0.42,
                ease: 'power3.out',
              },
              start + 0.1,
            )
          }
          timeline.fromTo(
            frame.querySelector('.team-photo'),
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 0.48, ease: 'power3.out' },
            start + (index === 0 ? 0.12 : 0.2),
          )
          timeline.fromTo(
            frame.querySelector('.team-profile'),
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.48, ease: 'power3.out' },
            start + 0.22,
          )
          timeline.call(
            () => {
              const current = root.value?.querySelector<HTMLElement>('[data-team-current]')
              if (current) current.textContent = String(index + 1).padStart(2, '0')
            },
            [],
            start,
          )
        })
        timeline.addLabel('team-last-frame', 0.35 + frames.length * storyTiming.teamFrame)
      },
      chapterOptions('story-team', 0.35 + people.length * storyTiming.teamFrame),
    )
  }

  const craft = element('story-craft')
  if (craft) {
    const frames = gsap.utils.toArray<HTMLElement>('[data-craft-frame]')
    gsap.set(frames, { opacity: 0, x: 90, scale: 0.97, pointerEvents: 'none' })
    if (frames[0]) gsap.set(frames[0], { opacity: 1, x: 0, scale: 1, pointerEvents: 'auto' })

    useChapter(
      craft,
      (timeline) => {
        useSplitReveal(timeline, '[data-craft-heading-line]')
        timeline.fromTo(
          '.craft-heading > p',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          0.18,
        )
        frames.forEach((frame, index) => {
          const start = 0.34 + index * storyTiming.projectFrame
          const previousFrame = frames[index - 1]
          timeline.addLabel(`project-${index + 1}`, start)
          if (previousFrame) {
            timeline.set(previousFrame, { pointerEvents: 'none' }, start)
            timeline.set(frame, { pointerEvents: 'auto' }, start + 0.1)
            timeline.to(
              previousFrame,
              { opacity: 0, x: -70, scale: 0.94, duration: 0.28, ease: 'power2.inOut' },
              start,
            )
            timeline.fromTo(
              frame,
              { opacity: 0, x: 100, scale: 0.97 },
              { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'power3.out' },
              start + 0.1,
            )
          }
          timeline.fromTo(
            frame.querySelector('.craft-browser'),
            { y: 22, rotateY: 3 },
            { y: 0, rotateY: 0, duration: 0.55, ease: 'power3.out' },
            start + 0.06,
          )
          const image = frame.querySelector<HTMLElement>('[data-project-image]')
          if (image) {
            timeline.fromTo(
              image,
              { scale: 1.04, yPercent: 0 },
              { scale: 1.12, yPercent: -2, duration: 0.7, ease: 'power2.inOut' },
              start + 0.12,
            )
          }
          timeline.fromTo(
            frame.querySelector('.craft-caption'),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
            start + 0.18,
          )
          timeline.call(
            () => {
              const current = root.value?.querySelector<HTMLElement>('[data-project-current]')
              if (current) current.textContent = String(index + 1).padStart(2, '0')
            },
            [],
            start,
          )
        })
        timeline.addLabel('craft-last-project', 0.34 + frames.length * storyTiming.projectFrame)
      },
      chapterOptions('story-craft', 0.34 + projects.length * storyTiming.projectFrame),
    )
  }

  const impact = element('story-impact')
  if (impact) {
    useChapter(
      impact,
      (timeline) => {
        useSplitReveal(timeline, '[data-impact-heading-line]')
        timeline.fromTo(
          '.impact-heading > p',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          0.18,
        )
        const counters = gsap.utils.toArray<HTMLElement>('[data-counter]')
        counters.forEach((counter, index) => {
          useCounter(
            timeline,
            counter,
            Number(counter.dataset.counter ?? 0),
            counter.dataset.suffix ?? '',
            0.16 + index * 0.12,
          )
        })
        timeline.fromTo(
          '.impact-value',
          { opacity: 0, y: 24, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.5,
        )
        timeline.addLabel('impact-values')
      },
      chapterOptions('story-impact', 1.25),
    )
  }

  const next = element('story-next')
  if (next) {
    useChapter(
      next,
      (timeline) => {
        useSplitReveal(timeline, '[data-next-heading-line]')
        timeline.fromTo(
          '.next-intro, .next-cta, .next-email',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out' },
          0.25,
        )
        timeline.fromTo(
          '.next-woven-lines path',
          { strokeDasharray: 900, strokeDashoffset: 900 },
          { strokeDashoffset: 0, duration: 0.75, stagger: 0.04, ease: 'power2.inOut' },
          0.1,
        )
        timeline.to('.next-woven-lines', { scale: 0.88, yPercent: 5, ease: 'power2.inOut' }, 0.15)
        timeline.addLabel('next-invitation', 0.8)
      },
      chapterOptions('story-next', 1.05),
    )
  }

  removeMagnetic = useMagnetic(
    gsap.utils.toArray<HTMLElement>('[data-magnetic], .team-photo'),
  )
}

function buildSimpleStory() {
  if (!root.value) return
  const reveals = gsap.utils.toArray<HTMLElement>(
    '.story-chapter-label, .spark-copy, .spark-art, .spark-footer, .nest-copy, .nest-graphic, .nest-manifesto p, .team-frame, .craft-frame, .impact-stat, .impact-value, .next-copy',
  )
  reveals.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      },
    )
  })
}

function playPreloader() {
  if (!root.value) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) {
    preloaderActive.value = false
    return
  }

  const paths = Array.from(root.value.querySelectorAll('.story-preloader-logo .logo-nest path'))
  const words = Array.from(root.value.querySelectorAll('.story-preloader-logo text'))
  preloaderTimeline = gsap.timeline({
    onComplete: () => {
      preloaderActive.value = false
      ScrollTrigger.refresh()
    },
  })
  preloaderTimeline
    .fromTo(paths, { strokeDasharray: 240, strokeDashoffset: 240 }, {
      strokeDashoffset: 0,
      duration: 0.7,
      stagger: 0.07,
      ease: 'power2.inOut',
    })
    .fromTo(
      '.story-preloader-logo .logo-window path:last-child',
      { fill: '#12365B', scaleX: 0.08 },
      { fill: '#1B8AD0', scaleX: 1, duration: 0.4, ease: 'power3.out' },
      0.35,
    )
    .fromTo(words, { y: 12, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      stagger: 0.08,
      ease: 'power3.out',
    }, 0.55)
    .to('.story-preloader-mark > span', { autoAlpha: 1, duration: 0.3 }, 0.75)
    .to('.story-curtain-left', { xPercent: -102, duration: 0.75, ease: 'power3.inOut' }, 1.1)
    .to('.story-curtain-right', { xPercent: 102, duration: 0.75, ease: 'power3.inOut' }, 1.1)
}

function refreshAfterAssets() {
  if (!root.value) return
  const images = Array.from(root.value.querySelectorAll('img'))
  const imageLoads = images.map(
    (image) =>
      new Promise<void>((resolve) => {
        if (image.complete) {
          resolve()
          return
        }
        image.addEventListener('load', () => resolve(), { once: true })
        image.addEventListener('error', () => resolve(), { once: true })
      }),
  )
  const fontsReady = 'fonts' in document ? document.fonts.ready : Promise.resolve()
  void Promise.all([fontsReady, ...imageLoads]).then(() => ScrollTrigger.refresh())
}

onMounted(async () => {
  await nextTick()
  if (!root.value) return
  const storyRoot = root.value

  handleResize = () => {
    ScrollTrigger.refresh()
  }

  window.addEventListener('resize', handleResize, { passive: true })

  ScrollTrigger.config({ ignoreMobileResize: true })
  context = gsap.context(() => {
    media = gsap.matchMedia(storyRoot)
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      buildDesktopStory()
    })
    media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      buildSimpleStory()
    })
    media.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('[data-story-reveal], .story-line-mask > span', {
        autoAlpha: 1,
        clearProps: 'transform,clipPath',
      })
    })
  }, storyRoot)

  playPreloader()
  refreshAfterAssets()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  preloaderTimeline?.kill()
  removeMagnetic()
  media?.revert()
  context?.revert()
})
</script>

<template>
  <div
    ref="root"
    class="story-home"
    :class="{ 'story-home-dark-nav': ['story-nest', 'story-team', 'story-next'].includes(activeChapter) }"
  >
    <StoryPreloader v-if="preloaderActive" />
    <ChapterNav :chapters="chapters" :active-id="activeChapter" :lenis="lenis" />

    <StoryCursor />

    <SparkChapter :copy="storyCopy.spark" @navigate="emit('navigate', $event)" />
    <NestChapter :copy="storyCopy.nest" />
    <TeamChapter :people="people" :copy="storyCopy.team" @navigate="emit('navigate', $event)" />
    <CraftChapter :projects="projects" :copy="storyCopy.craft" @navigate="emit('navigate', $event)" />
    <ImpactChapter :copy="storyCopy.impact" />
    <NextChapter
      :copy="storyCopy.next"
      @navigate="emit('navigate', $event)"
      @back-to-top="goBackToTop"
    />
  </div>
</template>
