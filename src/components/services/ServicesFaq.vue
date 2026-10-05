<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { servicesPage, servicesTiming } from '../../data/services.js'

const openIndex = ref(-1)
const root = ref(null)
let context

function toggle(index) {
  const buttons = root.value?.querySelectorAll('.services-faq-question')
  const panels = root.value?.querySelectorAll('.services-faq-answer')
  const nextIndex = openIndex.value === index ? -1 : index

  if (!buttons || !panels) return
  const currentIndex = openIndex.value
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  context.add(() => gsap.killTweensOf(panels))

  if (currentIndex !== -1) {
    const currentPanel = panels[currentIndex]
    if (reducedMotion) {
      context.add(() => gsap.set(currentPanel, { display: 'none', clearProps: 'height,opacity' }))
    } else {
      context.add(() => {
        gsap.to(currentPanel, {
          height: 0,
          opacity: 0,
          duration: servicesTiming.faqClose,
          ease: servicesTiming.ease,
          onComplete: () => {
            gsap.set(currentPanel, { display: 'none', clearProps: 'height,opacity' })
          },
        })
      })
    }
    buttons[currentIndex]?.setAttribute('aria-expanded', 'false')
  }

  openIndex.value = nextIndex
  if (nextIndex === -1) return

  const nextPanel = panels[nextIndex]
  buttons[nextIndex]?.setAttribute('aria-expanded', 'true')
  if (reducedMotion) {
    context.add(() => gsap.set(nextPanel, { display: 'block', clearProps: 'height,opacity' }))
    return
  }

  context.add(() => {
    gsap.set(nextPanel, { display: 'block', height: 0, opacity: 0 })
    gsap.to(nextPanel, {
      height: 'auto',
      opacity: 1,
      duration: servicesTiming.faqOpen,
      ease: servicesTiming.ease,
      onComplete: () => gsap.set(nextPanel, { clearProps: 'height' }),
    })
  })
}

onMounted(() => {
  context = gsap.context(() => {}, root.value)
})

onBeforeUnmount(() => context?.revert())
</script>

<template>
  <div ref="root" class="services-faq-list">
    <article v-for="(item, index) in servicesPage.faq.items" :key="item.question" class="services-faq-item">
      <h3>
        <button
          :id="`service-faq-question-${index}`"
          class="services-faq-question"
          type="button"
          :aria-expanded="openIndex === index"
          :aria-controls="`service-faq-answer-${index}`"
          @click="toggle(index)"
        >
          <span>{{ item.question }}</span>
          <span class="services-faq-icon" aria-hidden="true">{{ openIndex === index ? '−' : '+' }}</span>
        </button>
      </h3>
      <div
        :id="`service-faq-answer-${index}`"
        class="services-faq-answer"
        role="region"
        :aria-labelledby="`service-faq-question-${index}`"
        :aria-hidden="openIndex !== index"
      >
        <p>{{ item.answer }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.services-faq-list {
  max-width: 900px;
  margin-top: 42px;
  border-top: 1px solid rgb(18 54 91 / 17%);
}

.services-faq-item {
  border-bottom: 1px solid rgb(18 54 91 / 17%);
}

.services-faq-item h3 {
  margin: 0;
}

.services-faq-question {
  display: flex;
  width: 100%;
  min-height: 72px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.services-faq-question:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 4px;
}

.services-faq-icon {
  color: var(--blue);
  font-size: 21px;
  font-weight: 400;
}

.services-faq-answer {
  display: none;
  overflow: hidden;
}

.services-faq-answer p {
  max-width: 650px;
  margin: 0;
  padding: 0 38px 22px 0;
  color: #526477;
  font-size: 11px;
  line-height: 1.9;
}

@media (max-width: 767px) {
  .services-faq-list {
    margin-top: 30px;
  }

  .services-faq-question {
    min-height: 64px;
    gap: 16px;
    font-size: 13px;
  }

  .services-faq-answer p {
    font-size: 10px;
  }
}
</style>
