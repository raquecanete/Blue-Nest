<template>
  <svg
    viewBox="0 0 222 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="blue-nest-logo-title"
  >
    <title id="blue-nest-logo-title">Blue Nest</title>
    <g class="logo-nest" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
      <path d="M8 28c8 33 23 49 40 49s32-16 40-49" />
      <path d="M2 37c10 32 26 47 46 47s36-15 46-47" />
      <path d="M17 20c7 30 18 44 31 44s24-14 31-44" />
      <path d="M8 28c25 9 55 9 80 0M2 37c26 9 66 9 92 0M17 20c18 6 44 6 62 0" />
    </g>
    <g class="logo-window">
      <rect x="22" y="7" width="52" height="38" rx="4" fill="#E7E8E9" stroke="#12365B" stroke-width="2" />
      <path d="M23 12a4 4 0 0 1 4-4h44a2 2 0 0 1 2 2v7H23v-5Z" fill="#12365B" />
      <circle cx="29" cy="12" r="1.5" fill="#E7E8E9" />
      <circle cx="35" cy="12" r="1.5" fill="#E7E8E9" />
      <circle cx="41" cy="12" r="1.5" fill="#E7E8E9" />
      <path d="M28 22h40v17H28z" fill="#1B8AD0" />
      <path d="M32 26h14M32 30h22" stroke="#E7E8E9" stroke-width="1.5" stroke-linecap="round" opacity=".85" />
    </g>
    <text x="106" y="34" font-family="Manrope, sans-serif" font-size="21" font-weight="800" letter-spacing="1.1" fill="currentColor">BLUE</text>
    <text x="106" y="66" font-family="Manrope, sans-serif" font-size="21" font-weight="800" letter-spacing="1.1" fill="currentColor">NEST</text>
  </svg>
</template>

<style scoped>
svg {
  display: block;
  width: 100%;
  height: auto;
  color: #12365b;
  overflow: visible;
}

.header-logo-light {
  color: #e7e8e9;
}

.header-logo-light .logo-window rect {
  stroke: #e7e8e9;
}

.logo-nest path {
  stroke-dasharray: 240;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 900ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

svg:hover .logo-nest path {
  stroke-dashoffset: 240;
}

.logo-window rect,
.logo-window path {
  transform-box: fill-box;
  transform-origin: center;
  animation: panel-arrive 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes panel-arrive {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-window rect,
  .logo-window path {
    animation: none;
  }

  .logo-nest path {
    transition: none;
  }
}
</style>
