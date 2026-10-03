import { gsap } from 'gsap'
import { storyTiming } from '../data/story.js'

export function useMagnetic(elements: HTMLElement[]) {
  const cleanups: Array<() => void> = []

  elements.forEach((element) => {
    let bounds = element.getBoundingClientRect()
    const moveX = gsap.quickTo(element, 'x', {
      duration: storyTiming.magneticEase,
      ease: 'power2.out',
    })
    const moveY = gsap.quickTo(element, 'y', {
      duration: storyTiming.magneticEase,
      ease: 'power2.out',
    })

    const updateBounds = () => {
      bounds = element.getBoundingClientRect()
    }
    const handleMove = (event: PointerEvent) => {
      moveX((event.clientX - bounds.left - bounds.width / 2) * 0.12)
      moveY((event.clientY - bounds.top - bounds.height / 2) * 0.12)
    }
    const reset = () => {
      moveX(0)
      moveY(0)
    }

    element.addEventListener('pointerenter', updateBounds)
    element.addEventListener('pointermove', handleMove)
    element.addEventListener('pointerleave', reset)
    cleanups.push(() => {
      element.removeEventListener('pointerenter', updateBounds)
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerleave', reset)
      gsap.set(element, { clearProps: 'transform' })
    })
  })

  return () => cleanups.splice(0).forEach((cleanup) => cleanup())
}
