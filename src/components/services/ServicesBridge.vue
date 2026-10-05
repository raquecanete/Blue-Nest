<script setup>
import { servicesPage } from '../../data/services.js'
</script>

<template>
  <section class="services-bridge services-section-pad" aria-labelledby="services-bridge-heading">
    <div class="services-bridge-copy services-reveal">
      <p class="services-eyebrow">{{ servicesPage.bridge.eyebrow }}</p>
      <h2 id="services-bridge-heading">{{ servicesPage.bridge.headline }}</h2>
      <p>{{ servicesPage.bridge.support }}</p>
    </div>
    <div class="services-bridge-index services-reveal" aria-hidden="true">
      <span v-for="(service, index) in servicesPage.overview.services" :key="service.id">
        <b>0{{ index + 1 }}</b>{{ service.shortTitle }}
      </span>
    </div>
  </section>
</template>
