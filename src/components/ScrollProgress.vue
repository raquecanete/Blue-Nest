<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type Lenis from 'lenis'

const props = defineProps<{ lenis: Lenis | null }>()

const progress = ref(0)
let activeLenis: Lenis | null = null

function updateFromNativeScroll() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
}

function updateFromLenis({ progress: value }: { progress: number }) {
  progress.value = value
}

function attachLenis(instance: Lenis | null) {
  window.removeEventListener('scroll', updateFromNativeScroll)

  if (activeLenis) {
    activeLenis.off('scroll', updateFromLenis)
    activeLenis = null
  }

  if (instance) {
    activeLenis = instance
    activeLenis.on('scroll', updateFromLenis)
    updateFromLenis({ progress: activeLenis.progress })
    return
  }

  window.addEventListener('scroll', updateFromNativeScroll, { passive: true })
  updateFromNativeScroll()
}

watch(() => props.lenis, attachLenis)

onMounted(() => {
  attachLenis(props.lenis)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateFromNativeScroll)
  if (activeLenis) {
    activeLenis.off('scroll', updateFromLenis)
  }
})
</script>

<template>
  <div
    class="scroll-progress"
    role="progressbar"
    aria-label="Page scroll progress"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="Math.round(progress * 100)"
  >
    <span :style="{ transform: `scaleX(${progress})` }"></span>
  </div>
</template>
