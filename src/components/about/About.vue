<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutStory, aboutTiming } from '../../data/about.js'
import { people } from '../../data/story.js'

const props = defineProps({
  navigate: { type: Function, required: true },
  lenis: { type: Object, default: null },
})

const root = ref(null)
let context

function animateCount(target, reducedMotion) {
  const value = Number(target.dataset.value)
  if (!Number.isFinite(value)) return

  const counter = { value: 0 }
  gsap.to(counter, {
    value,
    duration: reducedMotion ? 0 : 1,
    ease: aboutTiming.ease,
    snap: { value: 1 },
    onUpdate: () => {
      target.textContent = Math.round(counter.value).toLocaleString()
    },
    scrollTrigger: {
      trigger: target,
      start: aboutTiming.revealStart,
      once: true,
    },
  })
}

onMounted(async () => {
  const images = [...(root.value?.querySelectorAll('img') ?? [])]
  await Promise.all(
    images.map((image) =>
      image.complete ? Promise.resolve() : image.decode(),
    ),
  )
  await document.fonts.ready
  ScrollTrigger.refresh()

  if (!root.value) return

  context = gsap.context(() => {
    const media = gsap.matchMedia()

    media.add(
      {
        desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (match) => {
        const reducedMotion = Boolean(match.conditions?.reduced)
        const rise = reducedMotion ? 0 : aboutTiming.rise

        gsap.fromTo(
          '.about-line-mask > *',
          reducedMotion ? { autoAlpha: 0 } : { autoAlpha: 0, yPercent: 110 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: reducedMotion ? 0.25 : 0.85,
            stagger: reducedMotion ? 0 : aboutTiming.stagger,
            ease: aboutTiming.ease,
          },
        )

        gsap.utils.toArray('.about-reveal', root.value).forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: rise },
            {
              autoAlpha: 1,
              y: 0,
              duration: reducedMotion ? 0.25 : aboutTiming.duration,
              stagger: reducedMotion ? 0 : aboutTiming.stagger,
              ease: aboutTiming.ease,
              scrollTrigger: {
                trigger: element,
                start: aboutTiming.revealStart,
                once: true,
              },
            },
          )
        })

        root.value.querySelectorAll('[data-about-count="true"]').forEach((target) => {
          animateCount(target, reducedMotion)
        })

        if (match.conditions?.desktop) {
          gsap.to('.about-mission-word', {
            color: '#12365B',
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-mission',
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          })

          gsap.fromTo(
            '.about-process-line span',
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.about-process',
                start: 'top 72%',
                end: 'bottom 70%',
                scrub: 0.5,
              },
            },
          )

          gsap.to('.about-hero-image img', {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          })
        } else if (!reducedMotion) {
          gsap.fromTo(
            '.about-process-line span',
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.8,
              ease: aboutTiming.ease,
              scrollTrigger: {
                trigger: '.about-process',
                start: aboutTiming.revealStart,
                once: true,
              },
            },
          )
        }
      },
      root.value,
    )

    return () => media.revert()
  }, root.value)

  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <article ref="root" class="about-page">
    <section id="about" class="about-hero about-section">
      <div class="about-hero-copy">
        <p class="about-eyebrow">{{ aboutStory.hero.eyebrow }}</p>
        <h1 class="about-headline">
          <span class="about-line-mask"><span>{{ aboutStory.hero.headline[0] }}</span></span>
          <span class="about-line-mask"><em>{{ aboutStory.hero.headline[1] }}</em></span>
        </h1>
        <p class="about-support">{{ aboutStory.hero.support }}</p>
        <p class="about-intro">{{ aboutStory.hero.intro }}</p>
        <dl class="about-stats">
          <div v-for="stat in aboutStory.hero.stats" :key="stat.label" class="about-stat">
            <dt>{{ stat.label }}</dt>
            <dd>
              <span v-if="stat.prefix">{{ stat.prefix }}</span>
              <span :data-about-count="stat.value !== 2026" :data-value="stat.value">
                {{ stat.value === 2026 ? stat.value : '0' }}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div class="about-hero-visual" aria-label="Blue Nest team portraits" role="group">
        <svg class="about-nest-lines" viewBox="0 0 560 410" fill="none" aria-hidden="true">
          <path d="M35 65C74 253 160 354 280 354S486 253 525 65" />
          <path d="M12 121C71 287 165 389 280 389S489 287 548 121" />
          <path d="M100 36C132 201 198 308 280 308S428 201 460 36" />
          <path d="M35 65C180 112 380 112 525 65M12 121C173 169 387 169 548 121M55 213C188 246 372 246 505 213" />
        </svg>
        <div class="about-portrait-grid">
          <figure
            v-for="(person, index) in people"
            :key="person.name"
            class="about-hero-image"
            :class="`about-hero-image-${index + 1}`"
          >
            <img :src="person.image" :alt="person.alt" />
          </figure>
        </div>
        <p class="about-visual-caption">Blue Nest · Five people, one shared standard</p>
      </div>
    </section>

    <section class="about-mission about-section">
      <div class="about-section-heading about-reveal">
        <p class="about-eyebrow">{{ aboutStory.mission.eyebrow }}</p>
        <h2 class="about-mission-statement" aria-label="Make good ideas useful, clear and lasting.">
          <span v-for="word in aboutStory.mission.headline.split(' ')" :key="word" class="about-mission-word">
            {{ word }}
          </span>
        </h2>
        <p class="about-section-support">{{ aboutStory.mission.support }}</p>
      </div>
    </section>

    <section class="about-services about-section">
      <div class="about-section-heading about-reveal">
        <p class="about-eyebrow">{{ aboutStory.services.eyebrow }}</p>
        <h2>{{ aboutStory.services.headline }}</h2>
      </div>
      <div class="about-service-grid">
        <article
          v-for="(service, index) in aboutStory.services.items"
          :key="service.title"
          class="about-service about-reveal"
        >
          <span class="about-service-icon" aria-hidden="true">
            <svg v-if="service.icon === 'strategy'" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="10.5" />
              <circle cx="16" cy="16" r="4.5" />
              <path d="m16 16 8-8" />
            </svg>
            <svg v-else-if="service.icon === 'identity'" viewBox="0 0 32 32" fill="none">
              <path d="M16 4.5 27.5 16 16 27.5 4.5 16 16 4.5Z" />
              <circle cx="16" cy="16" r="4" />
            </svg>
            <svg v-else viewBox="0 0 32 32" fill="none">
              <rect x="5" y="6.5" width="22" height="19" rx="2" />
              <path d="M5 12h22M11 9.5h.01M14 9.5h.01M10 17h12M10 21h8" />
            </svg>
          </span>
          <p class="about-item-index">0{{ index + 1 }}</p>
          <h3>{{ service.title }}</h3>
          <p class="about-card-line">{{ service.line }}</p>
        </article>
      </div>
    </section>

    <section class="about-process about-section">
      <div class="about-section-heading about-reveal">
        <p class="about-eyebrow">{{ aboutStory.process.eyebrow }}</p>
        <h2>{{ aboutStory.process.headline }}</h2>
      </div>
      <div class="about-process-steps">
        <div class="about-process-line" aria-hidden="true"><span></span></div>
        <article
          v-for="(step, index) in aboutStory.process.steps"
          :key="step.title"
          class="about-process-step about-reveal"
        >
          <span class="about-step-number">0{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.line }}</p>
        </article>
      </div>
    </section>

    <section class="about-values about-section">
      <div class="about-section-heading about-reveal">
        <p class="about-eyebrow">{{ aboutStory.values.eyebrow }}</p>
        <h2>{{ aboutStory.values.headline }}</h2>
      </div>
      <div class="about-value-list">
        <article
          v-for="(value, index) in aboutStory.values.items"
          :key="value.title"
          class="about-value about-reveal"
        >
          <span>0{{ index + 1 }}</span>
          <h3>{{ value.title }}</h3>
        </article>
      </div>
    </section>

    <section class="about-team about-section">
      <div class="about-team-heading about-reveal">
        <div class="about-section-heading">
          <p class="about-eyebrow">{{ aboutStory.team.eyebrow }}</p>
          <h2>{{ aboutStory.team.headline }}</h2>
        </div>
        <p class="about-section-support">{{ aboutStory.team.support }}</p>
      </div>
      <div class="about-team-grid">
        <a
          v-for="(person, index) in people"
          :key="person.name"
          class="about-team-person about-reveal"
          href="/people#team"
          :aria-label="`Meet ${person.name}, ${person.role}`"
          @click.prevent="props.navigate('/people#team')"
        >
          <figure>
            <img :src="person.image" :alt="person.alt" />
          </figure>
          <span class="about-team-index">0{{ index + 1 }}</span>
          <h3>{{ person.name }}</h3>
          <p>{{ person.role }}</p>
        </a>
      </div>
      <a class="about-team-link home-next-link" href="/people#team" @click.prevent="props.navigate('/people#team')">
        {{ aboutStory.team.link }} <span aria-hidden="true">↗</span>
      </a>
    </section>

    <section class="about-invite">
      <div class="about-invite-content about-reveal">
        <p class="about-eyebrow">{{ aboutStory.invite.eyebrow }}</p>
        <h2>{{ aboutStory.invite.headline }}</h2>
        <p>{{ aboutStory.invite.support }}</p>
        <a class="home-next-link" :href="aboutStory.invite.href">
          {{ aboutStory.invite.button }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  </article>
</template>

<style scoped>
.about-page {
  --about-radius: 12px;
  --about-gap: 24px;
  color: var(--navy);
  background: var(--paper);
}

.about-section {
  padding-right: 8%;
  padding-left: 8%;
}

.about-hero {
  position: relative;
  display: grid;
  min-height: 760px;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: center;
  gap: var(--about-gap);
  padding-top: 150px;
  padding-bottom: 88px;
  overflow: hidden;
}

.about-hero-copy {
  z-index: 1;
  grid-column: 1 / span 6;
}

.about-eyebrow {
  margin: 0;
  color: rgb(18 54 91 / 68%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  line-height: 1.6;
  text-transform: uppercase;
}

.about-headline {
  margin: 28px 0 0 -4px;
  font-size: clamp(62px, 7vw, 96px);
  font-weight: 600;
  letter-spacing: -0.09em;
  line-height: 0.92;
}

.about-line-mask {
  display: block;
  overflow: hidden;
}

.about-line-mask > span,
.about-line-mask > em {
  display: block;
  font-style: normal;
}

.about-line-mask > em {
  color: var(--blue);
  font-weight: 500;
}

.about-support {
  max-width: 440px;
  margin: 28px 0 0;
  color: var(--ink);
  font-size: clamp(16px, 1.5vw, 19px);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.55;
}

.about-intro {
  max-width: 410px;
  margin: 16px 0 0;
  color: #526477;
  font-size: 13px;
  line-height: 1.9;
}

.about-stats {
  display: grid;
  max-width: 470px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 40px 0 0;
  border-top: 1px solid rgb(18 54 91 / 18%);
}

.about-stat {
  padding: 16px 8px 0 0;
}

.about-stat dt {
  color: #596b7a;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.about-stat dd {
  margin: 8px 0 0;
  color: var(--navy);
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.06em;
}

.about-stat dd > span:first-child:not(:last-child) {
  margin-right: 3px;
  color: #596b7a;
  font-family: var(--mono);
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.08em;
}

.about-hero-visual {
  position: relative;
  grid-column: 8 / -1;
  align-self: stretch;
  min-height: 440px;
}

.about-nest-lines {
  position: absolute;
  top: 48%;
  left: 50%;
  width: 115%;
  overflow: visible;
  transform: translate(-50%, -50%);
}

.about-nest-lines path {
  stroke: var(--navy);
  stroke-width: 1;
  opacity: 0.09;
}

.about-portrait-grid {
  position: absolute;
  inset: 10% 3% 12%;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 12px;
}

.about-hero-image {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  border-radius: var(--about-radius);
  background: #d5d8da;
}

.about-hero-image img,
.about-team-person img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-hero-image-1 { grid-area: 1 / 1 / 5 / 4; }
.about-hero-image-2 { grid-area: 1 / 4 / 4 / 7; }
.about-hero-image-3 { grid-area: 5 / 1 / 7 / 3; }
.about-hero-image-4 { grid-area: 4 / 3 / 7 / 5; }
.about-hero-image-5 { grid-area: 4 / 5 / 7 / 7; }

.about-visual-caption {
  position: absolute;
  right: 3%;
  bottom: 4%;
  margin: 0;
  color: #596b7a;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.about-mission {
  padding-top: 112px;
  padding-bottom: 128px;
  background: #fff;
}

.about-section-heading {
  max-width: 790px;
}

.about-section-heading h2 {
  max-width: 780px;
  margin: 24px 0 0 -3px;
  color: var(--navy);
  font-size: clamp(42px, 6.2vw, 78px);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 1.02;
}

.about-mission-statement {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.24em;
  row-gap: 0.04em;
}

.about-mission-word {
  color: rgb(18 54 91 / 20%);
}

.about-section-support {
  max-width: 480px;
  margin: 22px 0 0;
  color: #526477;
  font-size: 13px;
  line-height: 1.85;
}

.about-services {
  padding-top: 112px;
  padding-bottom: 120px;
}

.about-service-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 48px;
}

.about-service {
  position: relative;
  min-height: 236px;
  padding: 24px;
  border: 1px solid rgb(18 54 91 / 15%);
  border-radius: var(--about-radius);
  transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
}

.about-service::after {
  position: absolute;
  right: 24px;
  bottom: 0;
  left: 24px;
  height: 2px;
  background: var(--blue);
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 240ms ease;
}

.about-service:hover {
  border-color: rgb(18 54 91 / 24%);
  box-shadow: 0 12px 32px rgb(10 31 54 / 7%);
  transform: translateY(-4px);
}

.about-service:hover::after,
.about-service:focus-within::after {
  transform: scaleX(1);
}

.about-service-icon {
  display: block;
  width: 32px;
  height: 32px;
  color: var(--navy);
}

.about-service-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.4;
}

.about-item-index,
.about-step-number,
.about-value > span,
.about-team-index {
  color: var(--blue);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
}

.about-item-index {
  margin: 24px 0 8px;
}

.about-service h3,
.about-process-step h3,
.about-value h3,
.about-team-person h3 {
  margin: 0;
  color: var(--navy);
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.05em;
}

.about-card-line,
.about-process-step p,
.about-value p,
.about-team-person p {
  margin: 8px 0 0;
  color: #526477;
  font-size: 11px;
  line-height: 1.8;
}

.about-card-line {
  max-width: 260px;
}

.about-process {
  padding-top: 112px;
  padding-bottom: 120px;
  background: #fff;
}

.about-process-steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  margin-top: 64px;
}

.about-process-line {
  position: absolute;
  top: 4px;
  right: 0;
  left: 0;
  height: 1px;
  background: rgb(18 54 91 / 14%);
}

.about-process-line span {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--blue);
  transform: scaleX(0);
  transform-origin: left center;
}

.about-process-step {
  position: relative;
  padding-top: 24px;
}

.about-process-step::before {
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

.about-step-number {
  display: block;
  margin-bottom: 12px;
}

.about-process-step h3 {
  font-size: 17px;
}

.about-values {
  padding-top: 112px;
  padding-bottom: 128px;
}

.about-value-list {
  margin-top: 44px;
  border-top: 1px solid rgb(18 54 91 / 17%);
}

.about-value {
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  align-items: baseline;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid rgb(18 54 91 / 17%);
}

.about-value h3 {
  font-size: clamp(17px, 2vw, 24px);
}

.about-team {
  padding-top: 112px;
  padding-bottom: 120px;
  background: #fff;
}

.about-team-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}

.about-team-heading .about-section-heading {
  max-width: 650px;
}

.about-team-heading .about-section-heading h2 {
  font-size: clamp(40px, 5.4vw, 68px);
}

.about-team-heading .about-section-support {
  max-width: 270px;
  margin-bottom: 4px;
}

.about-team-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  margin-top: 48px;
}

.about-team-person {
  min-width: 0;
  outline: none;
}

.about-team-person:focus-visible,
.about-team-link:focus-visible,
.about-invite a:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 5px;
  border-radius: 4px;
}

.about-team-person figure {
  aspect-ratio: 4 / 5;
  margin: 0 0 14px;
  overflow: hidden;
  border-radius: var(--about-radius);
  background: #d5d8da;
}

.about-team-person img {
  transition: transform 350ms ease;
}

.about-team-person:hover img,
.about-team-person:focus-visible img {
  transform: scale(1.03);
}

.about-team-index {
  display: block;
  margin-bottom: 7px;
}

.about-team-person h3 {
  font-size: 14px;
  line-height: 1.4;
}

.about-team-person p {
  font-size: 10px;
}

.about-team-link {
  margin-top: 36px;
}

.about-invite {
  padding: 96px 8%;
  color: var(--paper);
  background: var(--ink);
}

.about-invite-content {
  max-width: 850px;
}

.about-invite .about-eyebrow {
  color: rgb(231 232 233 / 65%);
}

.about-invite h2 {
  margin: 20px 0 0 -3px;
  font-size: clamp(42px, 6vw, 76px);
  font-weight: 500;
  letter-spacing: -0.075em;
  line-height: 1;
}

.about-invite-content > p:not(.about-eyebrow) {
  margin: 18px 0 26px;
  color: rgb(231 232 233 / 68%);
  font-size: 13px;
  line-height: 1.8;
}

.about-invite .home-next-link {
  border-color: rgb(231 232 233 / 38%);
  color: var(--paper);
}

.about-invite .home-next-link:hover {
  border-color: var(--blue);
  color: var(--blue);
}

@media (max-width: 900px) {
  .about-hero {
    min-height: 670px;
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }

  .about-hero-copy {
    grid-column: 1 / span 4;
  }

  .about-hero-visual {
    grid-column: 5 / -1;
    min-height: 390px;
  }

  .about-headline {
    font-size: clamp(58px, 8vw, 82px);
  }

  .about-team-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 28px;
  }
}

@media (max-width: 767px) {
  .about-section {
    padding-right: 7%;
    padding-left: 7%;
  }

  .about-hero {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 28px;
    padding-top: 132px;
    padding-bottom: 64px;
  }

  .about-hero-copy {
    grid-column: 1;
  }

  .about-headline {
    margin-top: 22px;
    font-size: clamp(54px, 13vw, 74px);
  }

  .about-support {
    margin-top: 22px;
    font-size: 16px;
  }

  .about-intro {
    font-size: 12px;
  }

  .about-stats {
    margin-top: 28px;
  }

  .about-stat dd {
    font-size: 18px;
  }

  .about-hero-visual {
    min-height: 370px;
    grid-column: 1;
  }

  .about-portrait-grid {
    inset: 8% 4% 13%;
  }

  .about-visual-caption {
    right: 4%;
    bottom: 3%;
  }

  .about-mission,
  .about-services,
  .about-process,
  .about-values,
  .about-team {
    padding-top: 76px;
    padding-bottom: 80px;
  }

  .about-section-heading h2,
  .about-team-heading .about-section-heading h2 {
    font-size: clamp(39px, 10vw, 58px);
  }

  .about-section-support {
    font-size: 12px;
  }

  .about-service-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 32px;
  }

  .about-service {
    min-height: auto;
    padding: 20px;
  }

  .about-item-index {
    margin-top: 16px;
  }

  .about-process-steps {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 38px;
    padding-left: 20px;
  }

  .about-process-line {
    top: 4px;
    bottom: 0;
    left: 4px;
    width: 1px;
    height: auto;
  }

  .about-process-line span {
    width: 1px;
    height: 100%;
    transform: scaleY(0);
    transform-origin: center top;
  }

  .about-process-step {
    padding-top: 0;
  }

  .about-process-step::before {
    top: 4px;
    left: -20px;
    width: 9px;
    height: 9px;
  }

  .about-step-number {
    margin-bottom: 7px;
  }

  .about-value-list {
    margin-top: 30px;
  }

  .about-value {
    grid-template-columns: 32px 1fr;
    gap: 8px 14px;
    padding: 17px 0;
  }

  .about-value h3 {
    font-size: 18px;
  }

  .about-value p {
    grid-column: 2;
    margin-top: -2px;
  }

  .about-team-heading {
    display: block;
  }

  .about-team-heading .about-section-support {
    margin-top: 18px;
  }

  .about-team-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 12px;
    margin-top: 32px;
  }

  .about-team-person h3 {
    font-size: 13px;
  }

  .about-team-person p {
    font-size: 9px;
  }

  .about-team-link {
    margin-top: 28px;
  }

  .about-invite {
    padding: 76px 7%;
  }
}

@media (max-width: 420px) {
  .about-hero-visual {
    min-height: 310px;
  }

  .about-portrait-grid {
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page *,
  .about-page *::before,
  .about-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .about-process-line span {
    transform: scale(1) !important;
  }
}
</style>
