import { gsap } from 'gsap'

export function useCounter(
  timeline: gsap.core.Timeline,
  element: HTMLElement,
  target: number,
  suffix = '',
  position: gsap.Position = 0,
) {
  const counter = { value: 0 }
  element.textContent = `${String(0).padStart(2, '0')}${suffix}`

  timeline.fromTo(
    counter,
    { value: 0 },
    {
      value: target,
      duration: 0.9,
      ease: 'power2.out',
      snap: { value: 1 },
      onUpdate: () => {
        element.textContent = `${String(Math.round(counter.value)).padStart(2, '0')}${suffix}`
      },
    },
    position,
  )
}
