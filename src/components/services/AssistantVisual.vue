<script setup>
defineProps({
  label: { type: String, required: true },
  taskHeading: { type: String, required: true },
  calendarHeading: { type: String, required: true },
})
</script>

<template>
  <svg class="service-visual service-visual-assistant" viewBox="0 0 520 390" role="img" aria-labelledby="assistant-visual-title">
    <title id="assistant-visual-title">{{ label }}</title>
    <rect x="68" y="64" width="250" height="266" rx="12" fill="#fff" stroke="#12365B" stroke-opacity=".2" />
    <text x="96" y="103" fill="#12365B" font-family="Manrope, sans-serif" font-size="17" font-weight="700">{{ taskHeading }}</text>
    <path d="M96 130h192M96 188h192M96 246h192" stroke="#12365B" stroke-opacity=".12" />
    <rect x="96" y="147" width="20" height="20" rx="5" fill="#E7E8E9" stroke="#12365B" stroke-opacity=".3" />
    <path class="assistant-check" d="m101 157 5 5 9-11" stroke="#1B8AD0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="32" stroke-dashoffset="0" />
    <path d="M129 153h130M129 162h93" stroke="#12365B" stroke-opacity=".28" stroke-width="4" stroke-linecap="round" />
    <rect x="96" y="205" width="20" height="20" rx="5" fill="#E7E8E9" stroke="#12365B" stroke-opacity=".3" />
    <path class="assistant-check" d="m101 215 5 5 9-11" stroke="#1B8AD0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="32" stroke-dashoffset="0" />
    <path d="M129 211h130M129 220h93" stroke="#12365B" stroke-opacity=".28" stroke-width="4" stroke-linecap="round" />
    <rect x="96" y="263" width="20" height="20" rx="5" fill="#fff" stroke="#12365B" stroke-opacity=".3" />
    <path d="M129 269h130M129 278h93" stroke="#12365B" stroke-opacity=".28" stroke-width="4" stroke-linecap="round" />
    <rect x="285" y="112" width="166" height="205" rx="12" fill="#E7E8E9" stroke="#12365B" stroke-opacity=".18" />
    <rect x="301" y="96" width="166" height="205" rx="12" fill="#fff" stroke="#12365B" stroke-opacity=".2" />
    <text x="320" y="128" fill="#12365B" font-family="DM Mono, monospace" font-size="10" letter-spacing="1">{{ calendarHeading }}</text>
    <path d="M320 149h128M320 168h128M320 187h128M320 206h128M320 225h128M320 244h128M320 263h128M338 143v128M356 143v128M374 143v128M392 143v128M410 143v128M428 143v128" stroke="#12365B" stroke-opacity=".11" />
    <circle cx="374" cy="187" r="7" fill="#1B8AD0" />
  </svg>
</template>
