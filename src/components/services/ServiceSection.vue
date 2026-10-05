<script setup>
import AssistantVisual from './AssistantVisual.vue'
import BrowserVisual from './BrowserVisual.vue'
import LanguageVisual from './LanguageVisual.vue'
import { servicesPage } from '../../data/services.js'

defineProps({
  service: { type: Object, required: true },
  index: { type: Number, required: true },
})

const emit = defineEmits(['contact'])
</script>

<template>
  <section
    :id="service.id"
    class="service-section services-section-pad"
    :class="{
      'service-section-reverse': index % 2 === 1,
      'service-section-light': index === 1,
    }"
    :data-service-type="service.type"
    :aria-labelledby="`${service.id}-heading`"
  >
    <div class="service-visual-wrap service-story-visual">
      <BrowserVisual v-if="service.type === 'web'" :label="service.visualLabel" />
      <AssistantVisual
        v-else-if="service.type === 'assistant'"
        :label="service.visualLabel"
        :task-heading="service.visualContent.taskHeading"
        :calendar-heading="service.visualContent.calendarHeading"
      />
      <LanguageVisual
        v-else
        :label="service.visualLabel"
        :practice-label="service.visualContent.practiceLabel"
        :reply-label="service.visualContent.replyLabel"
        :phrases="service.visualContent.phrases"
      />
      <span class="service-visual-caption">{{ servicesPage.visualCaption }} · 0{{ index + 1 }}</span>
    </div>
    <div class="service-copy service-story-copy">
      <p class="services-eyebrow">{{ service.eyebrow }}</p>
      <h2 :id="`${service.id}-heading`">{{ service.title }}</h2>
      <p class="service-description">{{ service.description }}</p>

      <div v-if="service.examples.length" class="service-examples" :aria-label="service.examplesLabel">
        <span v-for="example in service.examples" :key="example">{{ example }}</span>
      </div>

      <div class="service-deliverables">
        <h3>{{ service.deliverablesLabel }}</h3>
        <ul>
          <li v-for="deliverable in service.deliverables" :key="deliverable">{{ deliverable }}</li>
        </ul>
      </div>

      <p class="service-best-for"><strong>{{ service.bestForLabel }}</strong> {{ service.bestFor }}</p>
      <button class="services-contact-button" type="button" @click="emit('contact')">
        {{ service.cta }} <span aria-hidden="true">↗</span>
      </button>
    </div>
  </section>
</template>
