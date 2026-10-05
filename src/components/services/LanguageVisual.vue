<script setup>
defineProps({
  label: { type: String, required: true },
  practiceLabel: { type: String, required: true },
  replyLabel: { type: String, required: true },
  phrases: { type: Array, required: true },
})
</script>

<template>
  <svg class="service-visual service-visual-language" viewBox="0 0 520 390" role="img" aria-labelledby="language-visual-title">
    <title id="language-visual-title">{{ label }}</title>
    <path d="M66 86a18 18 0 0 1 18-18h250a18 18 0 0 1 18 18v103a18 18 0 0 1-18 18H167l-41 34v-34H84a18 18 0 0 1-18-18V86Z" fill="#fff" stroke="#12365B" stroke-opacity=".2" />
    <text x="98" y="119" fill="#12365B" font-family="DM Mono, monospace" font-size="10" letter-spacing="1">{{ practiceLabel }}</text>
    <text class="language-phrase" x="98" y="157" fill="#12365B" font-family="Manrope, sans-serif" font-size="22" font-weight="600">{{ phrases[0] }}</text>
    <path d="M179 206a18 18 0 0 1 18-18h241a18 18 0 0 1 18 18v103a18 18 0 0 1-18 18h-45v34l-41-34H197a18 18 0 0 1-18-18V206Z" fill="#12365B" />
    <text x="211" y="239" fill="#E7E8E9" fill-opacity=".65" font-family="DM Mono, monospace" font-size="10" letter-spacing="1">{{ replyLabel }}</text>
    <text class="language-phrase" x="211" y="278" fill="#E7E8E9" font-family="Manrope, sans-serif" font-size="20" font-weight="600">{{ phrases[1] }}</text>
    <circle cx="421" cy="293" r="2.5" fill="#1B8AD0" />
    <circle cx="431" cy="293" r="2.5" fill="#1B8AD0" fill-opacity=".65" />
    <circle cx="441" cy="293" r="2.5" fill="#1B8AD0" fill-opacity=".35" />
  </svg>
</template>
