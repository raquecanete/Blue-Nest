<script setup>
defineProps({ label: { type: String, required: true } })
</script>

<template>
  <svg class="service-visual service-visual-browser" viewBox="0 0 520 390" role="img" aria-labelledby="browser-visual-title">
    <title id="browser-visual-title">{{ label }}</title>
    <rect x="58" y="48" width="404" height="294" rx="12" fill="#fff" stroke="#12365B" stroke-opacity=".2" />
    <path d="M70 48h380a12 12 0 0 1 12 12v34H58V60a12 12 0 0 1 12-12Z" fill="#12365B" />
    <circle cx="82" cy="71" r="5" fill="#E7E8E9" />
    <circle cx="101" cy="71" r="5" fill="#E7E8E9" fill-opacity=".7" />
    <circle cx="120" cy="71" r="5" fill="#E7E8E9" fill-opacity=".45" />
    <rect x="88" y="120" width="170" height="12" rx="6" fill="#12365B" class="web-ui-block" />
    <rect x="88" y="145" width="132" height="7" rx="3.5" fill="#12365B" fill-opacity=".3" class="web-ui-block" />
    <rect x="88" y="160" width="150" height="7" rx="3.5" fill="#12365B" fill-opacity=".3" class="web-ui-block" />
    <rect x="88" y="184" width="80" height="27" rx="13.5" fill="#1B8AD0" class="web-ui-block" />
    <rect x="283" y="115" width="145" height="110" rx="9" fill="#1B8AD0" fill-opacity=".16" class="web-ui-block" />
    <rect x="303" y="135" width="105" height="70" rx="5" fill="#1B8AD0" class="web-ui-block" />
    <rect x="88" y="245" width="98" height="65" rx="7" fill="#E7E8E9" class="web-ui-block" />
    <rect x="198" y="245" width="98" height="65" rx="7" fill="#E7E8E9" class="web-ui-block" />
    <rect x="308" y="245" width="120" height="65" rx="7" fill="#E7E8E9" class="web-ui-block" />
    <path d="M98 263h54M98 277h38M208 263h54M208 277h38M318 263h72M318 277h54" stroke="#12365B" stroke-opacity=".35" stroke-width="4" stroke-linecap="round" />
  </svg>
</template>
