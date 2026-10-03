import { gsap } from 'gsap'

export function useParallax(
  timeline: gsap.core.Timeline,
  target: string | Element,
  distance = 10,
  position: gsap.Position = 0,
) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) return

  timeline.fromTo(
    element,
    { yPercent: -distance },
    { yPercent: distance, ease: 'none' },
    position,
  )
}
