import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(targets, options = {}) {
  const items = gsap.utils.toArray(targets)
  if (!items.length) return null

  const { y = 18, duration = 0.7, stagger = 0.08, once = true } = options

  gsap.fromTo(
    items,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: items[0],
        start: 'top 85%',
        once,
      },
    },
  )

  return items
}
