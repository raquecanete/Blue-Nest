<script setup>
import { ref, toRef } from 'vue'
import { servicesPage } from '../../data/services.js'
import ServicesBridge from './ServicesBridge.vue'
import ServicesFaq from './ServicesFaq.vue'
import ServicesOverview from './ServicesOverview.vue'
import ServicesProcess from './ServicesProcess.vue'
import ServicesSections from './ServicesSections.vue'
import { useServicesMotion } from '../../composables/useServicesMotion.js'

const props = defineProps({
  navigate: { type: Function, required: true },
  lenis: { type: Object, default: null },
})

const root = ref(null)
const activeService = ref(servicesPage.details[0].id)
const lenis = toRef(props, 'lenis')
const { scrollTo } = useServicesMotion(root, activeService, lenis)

function goToContact() {
  props.navigate('/contact#contact')
}
</script>

<template>
  <article ref="root" class="services-page">
    <section id="services" class="services-hero services-section-pad">
      <svg class="services-nest-mark" viewBox="0 0 560 410" fill="none" aria-hidden="true">
        <path d="M35 65C74 253 160 354 280 354S486 253 525 65" />
        <path d="M12 121C71 287 165 389 280 389S489 287 548 121" />
        <path d="M100 36C132 201 198 308 280 308S428 201 460 36" />
        <path d="M35 65C180 112 380 112 525 65M12 121C173 169 387 169 548 121M55 213C188 246 372 246 505 213" />
      </svg>
      <div class="services-hero-copy">
        <p class="services-eyebrow">{{ servicesPage.hero.eyebrow }}</p>
        <h1>
          <span v-for="line in servicesPage.hero.headline" :key="line.text" class="services-hero-line">
            <span :class="{ 'services-hero-emphasis': line.accent }">{{ line.text }}</span>
          </span>
        </h1>
        <p class="services-hero-support">{{ servicesPage.hero.support }}</p>
        <nav class="services-hero-links" :aria-label="servicesPage.hero.linksLabel">
          <a
            v-for="link in servicesPage.hero.links"
            :key="link.href"
            :href="link.href"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.label }} <span aria-hidden="true">↓</span>
          </a>
        </nav>
        <a class="services-scroll-cue" href="#services-bridge" @click.prevent="scrollTo('#services-bridge')">
          <span>{{ servicesPage.hero.scrollCue }}</span><b aria-hidden="true">↓</b>
        </a>
      </div>
      <div class="services-hero-aside" aria-hidden="true">
        <template v-for="(tag, index) in servicesPage.hero.tags" :key="tag">
          <i v-if="index" aria-hidden="true"></i><span>{{ tag }}</span>
        </template>
      </div>
    </section>

    <div id="services-bridge">
      <ServicesBridge />
    </div>

    <ServicesOverview @navigate-service="(id) => scrollTo(`#${id}`)" />

    <nav class="services-sticky-nav" :aria-label="servicesPage.stickyNavLabel">
      <div class="services-sticky-nav-inner">
        <span>{{ servicesPage.stickyNavTitle }}</span>
        <a
          v-for="item in servicesPage.overview.services"
          :key="item.id"
          :href="`#${item.id}`"
          :aria-current="activeService === item.id ? 'location' : undefined"
          @click.prevent="scrollTo(`#${item.id}`)"
        >
          {{ item.shortTitle }}
        </a>
        </div>
    </nav>

    <ServicesSections @contact="goToContact" />

    <ServicesProcess />

    <section class="services-faq services-section-pad" aria-labelledby="services-faq-heading">
      <div class="services-section-heading services-reveal">
        <p class="services-eyebrow">{{ servicesPage.faq.eyebrow }}</p>
        <h2 id="services-faq-heading">{{ servicesPage.faq.headline }}</h2>
      </div>
      <ServicesFaq />
    </section>

    <section class="services-invite">
      <div class="services-invite-inner services-reveal">
        <p class="services-eyebrow">{{ servicesPage.invite.eyebrow }}</p>
        <h2>{{ servicesPage.invite.headline }}</h2>
        <p>{{ servicesPage.invite.support }}</p>
        <a class="home-next-link" :href="servicesPage.invite.href" @click.prevent="goToContact">
          {{ servicesPage.invite.button }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  </article>
</template>

<style>
.services-page {
  --services-radius: 12px;
  --services-columns: 12;
  --services-overview-columns: 3;
  color: var(--navy);
  background: var(--paper);
}

.services-section-pad {
  padding-right: 8%;
  padding-left: 8%;
}

.services-hero {
  position: relative;
  display: flex;
  min-height: min(850px, 100svh);
  flex-direction: column;
  justify-content: center;
  padding-top: 150px;
  padding-bottom: 104px;
  overflow: hidden;
  isolation: isolate;
}

.services-nest-mark {
  position: absolute;
  z-index: -1;
  top: 50%;
  right: -4%;
  width: min(58vw, 760px);
  transform: translateY(-44%);
}

.services-nest-mark path {
  stroke: var(--navy);
  stroke-width: 1;
  opacity: 0.065;
}

.services-hero-copy {
  position: relative;
  z-index: 1;
  max-width: 900px;
}

.services-eyebrow {
  margin: 0;
  color: rgb(18 54 91 / 68%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  line-height: 1.6;
  text-transform: uppercase;
}

.services-hero h1 {
  max-width: 910px;
  margin: 26px 0 0 -4px;
  font-size: clamp(64px, 9vw, 120px);
  font-weight: 600;
  letter-spacing: -0.09em;
  line-height: 0.92;
}

.services-hero-line {
  display: block;
  overflow: hidden;
}

.services-hero-line > span,
.services-hero-line > em {
  display: block;
}

.services-hero-line .services-hero-emphasis {
  color: var(--blue);
  font-weight: 500;
}

.services-hero-support {
  max-width: 480px;
  margin: 26px 0 0;
  color: var(--ink);
  font-size: 14px;
  line-height: 1.8;
}

.services-hero-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
}

.services-hero-links a {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 20px;
  padding: 0 16px;
  border: 1px solid rgb(18 54 91 / 23%);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  transition: border-color 180ms ease, color 180ms ease;
}

.services-hero-links a:hover {
  border-color: var(--blue);
  color: var(--navy);
}

.services-hero-links span {
  color: var(--blue);
}

.services-scroll-cue {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 12px;
  margin-top: 36px;
  color: #526477;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.services-scroll-cue b {
  display: grid;
  width: 25px;
  height: 25px;
  place-items: center;
  border: 1px solid rgb(18 54 91 / 24%);
  border-radius: 50%;
  color: var(--blue);
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 500;
  transition: transform 180ms ease, border-color 180ms ease;
}

.services-scroll-cue:hover b {
  border-color: var(--blue);
  transform: translateY(3px);
}

.services-hero-aside {
  position: absolute;
  right: 8%;
  bottom: 36px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #627180;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
}

.services-hero-aside i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--blue);
}

.services-overview {
  padding-top: 32px;
  padding-bottom: 112px;
  background: #fff;
}

.services-bridge {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  align-items: end;
  gap: 48px;
  padding-top: 104px;
  padding-bottom: 104px;
  background: #fff;
}

.services-bridge-copy {
  max-width: 780px;
}

.services-bridge h2 {
  margin: 22px 0 0 -3px;
  color: var(--navy);
  font-size: clamp(40px, 5.7vw, 72px);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 1.03;
}

.services-bridge-copy > p:last-child {
  max-width: 500px;
  margin: 20px 0 0;
  color: #526477;
  font-size: 12px;
  line-height: 1.9;
}

.services-bridge-index {
  display: grid;
  border-top: 1px solid rgb(18 54 91 / 16%);
}

.services-bridge-index span {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 0;
  border-bottom: 1px solid rgb(18 54 91 / 16%);
  color: #526477;
  font-size: 10px;
}

.services-bridge-index b {
  color: var(--blue);
  font-family: var(--mono);
  font-size: 8px;
  font-weight: 400;
}

.services-section-heading {
  max-width: 760px;
}

.services-section-heading h2 {
  margin: 22px 0 0 -3px;
  color: var(--navy);
  font-size: clamp(40px, 5.8vw, 70px);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 1.03;
}

.services-overview-grid {
  display: grid;
  grid-template-columns: repeat(var(--services-overview-columns), minmax(0, 1fr));
  gap: 16px;
  margin-top: 46px;
}

.services-overview-card {
  min-height: 286px;
  padding: 24px;
  border: 1px solid rgb(18 54 91 / 15%);
  border-radius: var(--services-radius);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.services-overview-card:hover {
  border-color: rgb(18 54 91 / 24%);
  box-shadow: 0 12px 32px rgb(10 31 54 / 7%);
  transform: translateY(-4px);
}

.services-overview-icon {
  display: block;
  width: 31px;
  height: 31px;
  color: var(--navy);
}

.services-overview-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.4;
}

.services-card-index,
.service-visual-caption,
.services-step-number {
  color: var(--blue);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.services-card-index {
  margin: 22px 0 8px;
}

.services-overview-card h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.045em;
}

.services-card-promise {
  max-width: 280px;
  min-height: 42px;
  margin: 9px 0 20px;
  color: #526477;
  font-size: 11px;
  line-height: 1.8;
}

.services-overview-card > a {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgb(18 54 91 / 30%);
  font-size: 10px;
  font-weight: 700;
  transition: border-color 180ms ease, color 180ms ease;
}

.services-overview-card > a span {
  color: var(--blue);
}

.services-overview-card > a:hover {
  border-color: var(--blue);
  color: var(--navy);
}

.services-sticky-nav {
  position: sticky;
  z-index: 5;
  top: 8px;
  padding: 10px 8%;
  border-top: 1px solid rgb(18 54 91 / 10%);
  border-bottom: 1px solid rgb(18 54 91 / 10%);
  background: rgb(231 232 233 / 94%);
  backdrop-filter: blur(12px);
}

.services-sticky-nav-inner {
  display: flex;
  max-width: 1100px;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
}

.services-sticky-nav-inner > span {
  margin-right: auto;
  color: #526477;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.services-sticky-nav a {
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 999px;
  color: #526477;
  font-size: 10px;
  font-weight: 700;
  transition: color 160ms ease, border-color 160ms ease, background 160ms ease;
}

.services-sticky-nav a[aria-current='location'] {
  border-color: rgb(27 138 208 / 28%);
  color: var(--navy);
  background: rgb(27 138 208 / 8%);
}

.service-section {
  display: grid;
  min-height: 660px;
  grid-template-columns: repeat(var(--services-columns), minmax(0, 1fr));
  align-items: center;
  column-gap: 32px;
  padding-top: 96px;
  padding-bottom: 104px;
  scroll-margin-top: 104px;
}

.service-section-light {
  background: #fff;
}

.service-visual-wrap {
  position: relative;
  display: grid;
  min-height: 370px;
  grid-column: 1 / span 6;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgb(18 54 91 / 12%);
  border-radius: var(--services-radius);
  background: rgb(255 255 255 / 42%);
}

.service-visual {
  display: block;
  width: min(100%, 520px);
  height: auto;
  aspect-ratio: 4 / 3;
}

.service-visual-caption {
  position: absolute;
  right: 18px;
  bottom: 15px;
}

.service-copy {
  grid-column: 8 / -1;
}

.service-copy h2 {
  margin: 20px 0 0 -2px;
  color: var(--navy);
  font-size: clamp(34px, 4vw, 54px);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 1.04;
}

.service-description {
  max-width: 460px;
  margin: 17px 0 0;
  color: #526477;
  font-size: 12px;
  line-height: 1.9;
}

.service-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
}

.service-examples span {
  padding: 7px 10px;
  border: 1px solid rgb(18 54 91 / 16%);
  border-radius: 999px;
  color: var(--navy);
  font-size: 9px;
}

.service-deliverables {
  margin-top: 24px;
}

.service-deliverables h3 {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
}

.service-deliverables ul {
  display: grid;
  gap: 9px;
  margin: 13px 0 0;
  padding: 0;
  list-style: none;
}

.service-deliverables li {
  position: relative;
  padding-left: 18px;
  color: #526477;
  font-size: 10px;
  line-height: 1.6;
}

.service-deliverables li::before {
  position: absolute;
  top: 0.53em;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue);
  content: '';
}

.service-best-for {
  max-width: 440px;
  margin: 18px 0 0;
  color: #526477;
  font-size: 10px;
  line-height: 1.8;
}

.service-best-for strong {
  margin-right: 4px;
  color: var(--navy);
}

.services-contact-button {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
  padding: 0 16px;
  border: 1px solid rgb(18 54 91 / 28%);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  font-size: 10px;
  font-weight: 700;
  transition: color 180ms ease, border-color 180ms ease;
}

.services-contact-button span {
  color: var(--blue);
}

.services-contact-button:hover {
  border-color: var(--blue);
  color: var(--navy);
}

.service-section-reverse .service-visual-wrap {
  grid-column: 7 / -1;
  grid-row: 1;
}

.service-section-reverse .service-copy {
  grid-column: 1 / span 5;
  grid-row: 1;
}

.services-process {
  padding-top: 112px;
  padding-bottom: 124px;
  background: #fff;
}

.services-process > .services-section-heading > p:last-child {
  max-width: 440px;
  margin: 18px 0 0;
  color: #526477;
  font-size: 11px;
  line-height: 1.8;
}

.services-process-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  margin-top: 62px;
}

.services-process-line {
  position: absolute;
  top: 4px;
  right: 0;
  left: 0;
  height: 1px;
  background: rgb(18 54 91 / 15%);
}

.services-process-line span {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--blue);
  transform: scaleX(0);
  transform-origin: left center;
}

.services-process-step {
  position: relative;
  padding-top: 24px;
}

.services-process-step::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 9px;
  height: 9px;
  border: 1px solid var(--blue);
  border-radius: 50%;
  background: white;
  content: '';
}

.services-step-number {
  display: block;
  margin-bottom: 12px;
}

.services-process-step h3 {
  margin: 0;
  color: var(--navy);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.04em;
}

.services-process-step p {
  max-width: 220px;
  margin: 8px 0 0;
  color: #526477;
  font-size: 10px;
  line-height: 1.8;
}

.services-faq {
  padding-top: 112px;
  padding-bottom: 124px;
}

.services-page a:focus-visible,
.services-page button:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 4px;
}

.services-invite {
  padding: 96px 8%;
  color: var(--paper);
  background: var(--ink);
}

.services-invite-inner {
  max-width: 850px;
}

.services-invite .services-eyebrow {
  color: rgb(231 232 233 / 65%);
}

.services-invite h2 {
  margin: 20px 0 0 -3px;
  font-size: clamp(42px, 6vw, 76px);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 1;
}

.services-invite-inner > p:not(.services-eyebrow) {
  margin: 18px 0 26px;
  color: rgb(231 232 233 / 68%);
  font-size: 13px;
  line-height: 1.8;
}

.services-invite .home-next-link {
  border-color: rgb(231 232 233 / 38%);
  color: var(--paper);
}

.services-invite .home-next-link:hover {
  border-color: var(--blue);
  color: var(--paper);
}

@media (max-width: 900px) {
  .service-section {
    min-height: 620px;
    column-gap: 24px;
  }

  .service-visual-wrap {
    grid-column: 1 / span 6;
    min-height: 300px;
  }

  .service-copy {
    grid-column: 8 / -1;
  }

  .service-section-reverse .service-visual-wrap {
    grid-column: 7 / -1;
  }

  .service-section-reverse .service-copy {
    grid-column: 1 / span 5;
  }
}

@media (max-width: 767px) {
  .services-section-pad {
    padding-right: 7%;
    padding-left: 7%;
  }

  .services-hero {
    min-height: 710px;
    padding-top: 136px;
    padding-bottom: 92px;
  }

  .services-hero h1 {
    margin-top: 22px;
    font-size: clamp(54px, 12vw, 78px);
  }

  .services-hero-support {
    max-width: 380px;
    font-size: 12px;
  }

  .services-hero-links {
    gap: 7px;
    margin-top: 24px;
  }

  .services-scroll-cue {
    margin-top: 26px;
  }

  .services-hero-links a {
    min-height: 38px;
    gap: 10px;
    padding: 0 11px;
    font-size: 9px;
  }

  .services-nest-mark {
    top: 59%;
    right: -29%;
    width: 105%;
  }

  .services-hero-aside {
    right: 7%;
    bottom: 26px;
    gap: 8px;
    font-size: 7px;
  }

  .services-bridge,
  .services-overview,
  .services-process,
  .services-faq {
    padding-top: 76px;
    padding-bottom: 82px;
  }

  .services-bridge {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .services-bridge h2 {
    font-size: clamp(38px, 9.5vw, 56px);
  }

  .services-bridge-copy > p:last-child {
    font-size: 11px;
  }

  .services-section-heading h2 {
    font-size: clamp(38px, 9.5vw, 56px);
  }

  .services-overview-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 30px;
  }

  .services-overview-card {
    min-height: 252px;
    padding: 20px;
  }

  .services-sticky-nav {
    top: 0;
    padding: 8px 3%;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .services-sticky-nav::-webkit-scrollbar {
    display: none;
  }

  .services-sticky-nav-inner {
    width: max-content;
    min-width: 100%;
    gap: 4px;
  }

  .services-sticky-nav-inner > span {
    display: none;
  }

  .services-sticky-nav a {
    flex: 0 0 auto;
    padding: 8px 10px;
    font-size: 9px;
  }

  .service-section,
  .service-section-reverse {
    min-height: 0;
    grid-template-columns: 1fr;
    row-gap: 30px;
    padding-top: 66px;
    padding-bottom: 76px;
    scroll-margin-top: 74px;
  }

  .service-visual-wrap,
  .service-section-reverse .service-visual-wrap {
    min-height: auto;
    grid-column: 1;
    grid-row: auto;
    aspect-ratio: 4 / 3;
  }

  .service-copy,
  .service-section-reverse .service-copy {
    grid-column: 1;
    grid-row: auto;
  }

  .service-copy h2 {
    max-width: 530px;
    font-size: clamp(36px, 9vw, 52px);
  }

  .service-description {
    font-size: 11px;
  }

  .services-process-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 38px;
    padding-left: 20px;
  }

  .services-process-line {
    top: 4px;
    bottom: 0;
    left: 4px;
    width: 1px;
    height: auto;
  }

  .services-process-line span {
    width: 1px;
    height: 100%;
    transform: scaleY(0);
    transform-origin: center top;
  }

  .services-process-step {
    padding-top: 0;
  }

  .services-process-step::before {
    top: 4px;
    left: -20px;
  }

  .services-step-number {
    margin-bottom: 7px;
  }

  .services-invite {
    padding: 76px 7%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .services-page *,
  .services-page *::before,
  .services-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .services-process-line span {
    transform: scale(1) !important;
  }
}
</style>
