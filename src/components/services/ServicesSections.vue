<script setup>
import { servicesPage } from '../../data/services.js'
import ServiceSection from './ServiceSection.vue'

const emit = defineEmits(['contact'])
</script>

<template>
  <ServiceSection
    v-for="(service, index) in servicesPage.details"
    :key="service.id"
    :service="service"
    :index="index"
    @contact="emit('contact')"
  />
</template>
