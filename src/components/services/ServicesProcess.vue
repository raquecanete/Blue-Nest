<script setup>
import { servicesPage } from '../../data/services.js'
</script>

<template>
  <section class="services-process services-section-pad" aria-labelledby="services-process-heading">
    <div class="services-section-heading services-reveal">
      <p class="services-eyebrow">{{ servicesPage.process.eyebrow }}</p>
      <h2 id="services-process-heading">{{ servicesPage.process.headline }}</h2>
      <p>{{ servicesPage.process.support }}</p>
    </div>
    <div class="services-process-grid">
      <div class="services-process-line" aria-hidden="true"><span></span></div>
      <article v-for="(step, index) in servicesPage.process.steps" :key="step.title" class="services-process-step services-reveal">
        <span class="services-step-number">0{{ index + 1 }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.line }}</p>
      </article>
    </div>
  </section>
</template>
