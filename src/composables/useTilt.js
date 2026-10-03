export function useTilt(targets, options = {}) {
  const { maxX = 10, maxY = 10, scale = 1.02 } = options
  const elements = Array.from(targets || [])

  const bind = (element) => {
    const move = (event) => {
      const rect = element.getBoundingClientRect()
      const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width
      const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height
      const rotateY = x * maxX
      const rotateX = y * maxY * -1
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
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
