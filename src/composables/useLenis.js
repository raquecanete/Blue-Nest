import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export let lenis = null

const tick = (time) => {
  lenis?.raf(time * 1000)
}

export function initLenis() {
  if (
    lenis ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  ) {
    return lenis
  }

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroyLenis() {
  if (!lenis) {
    return
  }

  lenis.off('scroll', ScrollTrigger.update)
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
}
