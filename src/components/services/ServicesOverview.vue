<script setup>
import { servicesPage } from '../../data/services.js'

const emit = defineEmits(['navigate-service'])
</script>

<template>
  <section class="services-overview services-section-pad" aria-labelledby="services-overview-heading">
    <div class="services-section-heading services-reveal">
      <p class="services-eyebrow">{{ servicesPage.overview.eyebrow }}</p>
      <h2 id="services-overview-heading">{{ servicesPage.overview.headline }}</h2>
    </div>
    <div class="services-overview-grid">
      <article v-for="(service, index) in servicesPage.overview.services" :key="service.id" class="services-overview-card services-reveal">
        <span class="services-overview-icon" aria-hidden="true">
          <svg v-if="service.icon === 'web'" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="6" width="24" height="20" rx="3" />
            <path d="M4 12h24M8 9h.01M11 9h.01M9 17h7M9 21h13" />
          </svg>
          <svg v-else-if="service.icon === 'assistant'" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="5" width="20" height="23" rx="3" />
            <path d="M11 11h10M11 17l2 2 4-5M11 23h10" />
          </svg>
          <svg v-else viewBox="0 0 32 32" fill="none">
            <path d="M5 7h22v15H15l-6 5v-5H5V7Z" />
            <path d="M10 12h12M10 16h8" />
          </svg>
        </span>
        <p class="services-card-index">0{{ index + 1 }}</p>
        <h3>{{ service.shortTitle }}</h3>
        <p class="services-card-promise">{{ service.promise }}</p>
        <a :href="`#${service.id}`" @click.prevent="emit('navigate-service', service.id)">
          {{ service.learnMore }} <span aria-hidden="true">↗</span>
        </a>
      </article>
    </div>
  </section>
</template>
