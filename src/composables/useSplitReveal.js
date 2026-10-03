import { gsap } from 'gsap'

export function useSplitReveal(targetsOrTimeline, maybeSelectorOrOptions = {}, maybeOptions = {}) {
  const isTimeline =
    targetsOrTimeline &&
    typeof targetsOrTimeline.fromTo === 'function' &&
    typeof targetsOrTimeline.addLabel === 'function' &&
    typeof targetsOrTimeline.to === 'function'

  if (isTimeline) {
    const timeline = targetsOrTimeline
    const selector = maybeSelectorOrOptions || ''
    const {
      position = 0,
      yPercent = 18,
      clipPath = 'inset(0 0 24% 0)',
      opacity = 0.65,
      duration = 0.7,
      stagger = 0.08,
      ease = 'power3.out',
    } = maybeOptions

    const lines = gsap.utils.toArray(selector)
    if (!lines.length) return null

    timeline.fromTo(
      lines,
      { yPercent, clipPath, opacity },
      {
        yPercent: 0,
        clipPath: 'inset(0 0 0% 0)',
        opacity: 1,
        duration,
        stagger,
        ease,
      },
      position,
    )

    return timeline
  }

  const elements = gsap.utils.toArray(targetsOrTimeline)
  if (!elements.length) return null

  const { y = 22, stagger = 0.08, duration = 0.7, ease = 'power3.out', start = 'top 90%' } = maybeSelectorOrOptions

  gsap.set(elements, { y, autoAlpha: 0 })

  return gsap.to(elements, {
    y: 0,
    autoAlpha: 1,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: elements[0],
      start,
      once: true,
    },
  })
}
