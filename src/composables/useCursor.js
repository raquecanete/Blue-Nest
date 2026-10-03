export function useCursor() {
  const cursor = document.createElement('div')
  const cursorFollower = document.createElement('div')

  cursor.className = 'people-cursor'
  cursorFollower.className = 'people-cursor-follower'
  document.body.appendChild(cursor)
  document.body.appendChild(cursorFollower)

  const move = (event) => {
    cursor.style.left = `${event.clientX}px`
    cursor.style.top = `${event.clientY}px`
    cursorFollower.style.left = `${event.clientX}px`
    cursorFollower.style.top = `${event.clientY}px`
  }

  const hide = () => {
    cursor.classList.add('is-hidden')
    cursorFollower.classList.add('is-hidden')
  }

  const show = () => {
    cursor.classList.remove('is-hidden')
    cursorFollower.classList.remove('is-hidden')
  }

  const press = () => cursor.classList.add('is-pressed')
  const release = () => cursor.classList.remove('is-pressed')

  document.addEventListener('pointermove', move)
  document.addEventListener('pointerdown', press)
  document.addEventListener('pointerup', release)
  document.addEventListener('pointerleave', hide)
  document.addEventListener('pointerenter', show)

  return {
    cursor,
    cursorFollower,
    destroy() {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerdown', press)
      document.removeEventListener('pointerup', release)
      document.removeEventListener('pointerleave', hide)
      document.removeEventListener('pointerenter', show)
      cursor.remove()
      cursorFollower.remove()
    },
  }
}
