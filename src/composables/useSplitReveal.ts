import { gsap } from 'gsap'
import { storyTiming } from '../data/story.js'

export function useSplitReveal(
  timeline: gsap.core.Timeline,
  selector: string,
  position = 0,
) {
  const lines = gsap.utils.toArray<HTMLElement>(selector)
  if (!lines.length) return

  timeline.fromTo(
    lines,
    { yPercent: 18, clipPath: 'inset(0 0 24% 0)', opacity: 0.65 },
    {
      yPercent: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: storyTiming.entrance,
      stagger: storyTiming.splitStagger,
      ease: 'power3.out',
    },
    position,
  )
}
