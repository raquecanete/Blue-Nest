<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
const follower = ref<HTMLElement | null>(null)
const dot = ref<HTMLElement | null>(null)
const label = ref('')
let moveFollower: ((value: number) => void) | undefined
let moveFollowerY: ((value: number) => void) | undefined
let moveDot: ((value: number) => void) | undefined
let moveDotY: ((value: number) => void) | undefined

function handlePointerMove(event: PointerEvent) {
  moveFollower?.(event.clientX)
  moveFollowerY?.(event.clientY)
  moveDot?.(event.clientX)
  moveDotY?.(event.clientY)

  const target =
    event.target instanceof Element
      ? event.target.closest<HTMLElement>('[data-cursor], a, button')
      : null
  label.value = target?.dataset.cursor ?? ''
  root.value?.classList.toggle('is-hovering', Boolean(target))
}

function hideCursor() {
  root.value?.classList.add('is-hidden')
}

function showCursor() {
  root.value?.classList.remove('is-hidden')
}

onMounted(() => {
  if (
    !window.matchMedia('(pointer: fine)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) return
  moveFollower = gsap.quickTo(follower.value, 'x', { duration: 0.22, ease: 'power3.out' })
  moveFollowerY = gsap.quickTo(follower.value, 'y', { duration: 0.22, ease: 'power3.out' })
  moveDot = gsap.quickTo(dot.value, 'x', { duration: 0.08, ease: 'power2.out' })
  moveDotY = gsap.quickTo(dot.value, 'y', { duration: 0.08, ease: 'power2.out' })
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.addEventListener('pointerleave', hideCursor)
  document.addEventListener('pointerenter', showCursor)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('pointerleave', hideCursor)
  document.removeEventListener('pointerenter', showCursor)
})
</script>

<template>
  <div ref="root" class="story-cursor" aria-hidden="true">
    <span ref="follower" class="story-cursor-follower">{{ label }}</span>
    <span ref="dot" class="story-cursor-dot"></span>
  </div>
</template>
