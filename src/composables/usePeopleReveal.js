import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export async function waitForImages(root = document) {
  const images = [...root.querySelectorAll('img')]
  await Promise.all(
    images.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => {}))),
  )

  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  ScrollTrigger.refresh()
}

export function usePeopleReveal(root) {
  if (!root) return () => {}

  const ctx = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('[data-people-reveal]', { autoAlpha: 1, y: 0, clearProps: 'transform,clipPath' })
      return
    }

    gsap.utils.toArray('[data-people-reveal]').forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 24, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0,
          autoAlpha: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.75,
          ease: 'power3.out',
          delay: index * 0.08,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        },
      )
    })

    gsap.utils.toArray('[data-people-principle]').forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: index * 0.08,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        },
      )
    })
  }, root)

  return () => ctx.revert()
}
