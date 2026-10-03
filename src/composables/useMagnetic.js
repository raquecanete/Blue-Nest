export function useMagnetic(targets, strength = 0.18) {
  const elements = Array.from(targets || [])

  const bind = (element) => {
    const move = (event) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      element.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const leave = () => {
      element.style.transform = ''
    }

    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', leave)

    return { move, leave }
  }

  const handlers = elements.map((element) => bind(element))

  return () => {
    elements.forEach((element, index) => {
      element.removeEventListener('pointermove', handlers[index].move)
      element.removeEventListener('pointerleave', handlers[index].leave)
    })
  }
}
