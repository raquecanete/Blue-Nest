import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storyTiming } from '../data/story.js'

gsap.registerPlugin(ScrollTrigger)

interface ChapterOptions {
  distanceScreens: number
  active?: () => void
  snap?: boolean
}

export function useChapter(
  element: HTMLElement,
  build: (timeline: gsap.core.Timeline) => void,
  options: ChapterOptions,
) {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: element,
      start: 'top top',
      end: () =>
        `+=${Math.round(window.innerHeight * (options.distanceScreens - storyTiming.sceneOverlap))}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      ...(options.snap
        ? {
            snap: {
              snapTo: 'labels',
              delay: storyTiming.snapDelay,
              duration: { min: storyTiming.snapMin, max: storyTiming.snapMax },
              ease: 'power2.inOut',
            },
          }
        : {}),
      onEnter: options.active,
      onEnterBack: options.active,
      onUpdate: (trigger) => {
        if (trigger.isActive) options.active?.()
      },
    },
  })

  timeline.addLabel('chapter-start', 0)
  build(timeline)
  timeline.addLabel('chapter-end')

  return timeline
}
