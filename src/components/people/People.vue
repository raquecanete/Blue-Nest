<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { people } from '../../data/people.js'
import { peoplePageStory } from '../../data/story.js'

gsap.registerPlugin(ScrollTrigger, Flip)

const props = defineProps({
  lenis: { type: Object, default: null },
})

const selectedRole = ref('All')
const selectedMember = ref(people[0])
const activeSpotlightIndex = ref(0)
const overlayOpen = ref(false)
const teamGrid = ref(null)
const spotlight = ref(null)
const profileDialog = ref(null)
const previousFocus = ref(null)
let ctx = null

const roleFilters = computed(() => ['All', ...new Set(people.map((member) => member.role))])
const filteredMembers = computed(() => {
  if (selectedRole.value === 'All') return people
  return people.filter((member) => member.role === selectedRole.value)
})

const openMember = (member) => {
  previousFocus.value = document.activeElement
  selectedMember.value = member
  overlayOpen.value = true
  props.lenis?.stop()
  nextTick(() => profileDialog.value?.querySelector('button')?.focus())
}

const closeMember = () => {
  overlayOpen.value = false
  props.lenis?.start()
  nextTick(() => previousFocus.value?.focus?.())
}

const changeMember = (direction) => {
  const baseIndex = people.findIndex((member) => member.id === selectedMember.value?.id)
  const nextIndex = (baseIndex + direction + people.length) % people.length
  selectedMember.value = people[nextIndex]
}

const scrollToSpotlight = (index) => {
  if (!spotlight.value || !props.lenis) return
  props.lenis.scrollTo(spotlight.value, {
    offset: -94,
    duration: 1,
    onComplete: () => {
      const trigger = ScrollTrigger.getById('people-spotlight')
      if (trigger) trigger.scroll(trigger.start + (trigger.end - trigger.start) * (index / (people.length - 1)))
    },
  })
}

const handleKeydown = (event) => {
  if (!overlayOpen.value) return

  if (event.key === 'Escape') closeMember()
  if (event.key === 'ArrowRight') changeMember(1)
  if (event.key === 'ArrowLeft') changeMember(-1)

  if (event.key === 'Tab') {
    const focusable = [...profileDialog.value.querySelectorAll('button, a[href]')]
    const first = focusable[0]
    const last = focusable.at(-1)

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
}

const animateGridReorder = async () => {
  const grid = teamGrid.value
  if (!grid) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return

  const state = Flip.getState(grid.querySelectorAll('.people-card'))
  await nextTick()

  ctx?.add(() => {
    Flip.from(state, {
      duration: 0.7,
      ease: 'power3.out',
      absolute: true,
      stagger: 0.04,
      onEnter: (elements) => gsap.fromTo(elements, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }),
      onComplete: () => ScrollTrigger.refresh(),
    })
  })
}

watch(
  selectedRole,
  () => {
    animateGridReorder()
  },
)

onMounted(async () => {
  const root = document.querySelector('.people-page')
  if (!root) return

  const images = [...root.querySelectorAll('img')]
  await Promise.all(
    images.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => {}))),
  )
  await document.fonts?.ready
  ScrollTrigger.refresh()

  ctx = gsap.context(() => {
    const media = gsap.matchMedia()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo(
      '.promise-copy > *',
      { autoAlpha: 0, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0.25 : 0.75,
        stagger: reducedMotion ? 0 : 0.08,
        ease: 'power3.out',
      },
    )

    gsap.fromTo(
      '.promise-stat strong',
      { textContent: 0 },
      {
        textContent: (_, target) => target.dataset.value,
        duration: reducedMotion ? 0 : 1,
        ease: 'power3.out',
        snap: { textContent: 1 },
        stagger: 0.08,
        delay: reducedMotion ? 0 : 0.32,
      },
    )

    if (!reducedMotion) {
      gsap.fromTo(
        '.filter-chip',
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
      )
    }

    gsap.fromTo(
      '.people-card',
      { autoAlpha: 0, y: reducedMotion ? 0 : 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0.25 : 0.72,
        stagger: reducedMotion ? 0 : 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.people-grid', start: 'top 84%', once: true },
      },
    )

    gsap.fromTo(
      '.principle-card',
      { autoAlpha: 0, y: reducedMotion ? 0 : 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0.25 : 0.7,
        stagger: reducedMotion ? 0 : 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.principles-grid', start: 'top 86%', once: true },
      },
    )

    media.add(
      {
        desktop: '(min-width: 900px)',
        mobile: '(max-width: 899px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (context.conditions.desktop && !context.conditions.reduce) {
          const panels = gsap.utils.toArray('.spotlight-member')
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: 'people-spotlight',
              trigger: spotlight.value,
              start: 'top top',
              end: () => `+=${window.innerHeight * panels.length}`,
              pin: true,
              scrub: 0.6,
              snap: {
                snapTo: 'labelsDirectional',
                delay: 0.12,
                duration: { min: 0.2, max: 0.45 },
                ease: 'power2.inOut',
              },
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                activeSpotlightIndex.value = Math.round(self.progress * (panels.length - 1))
              },
            },
          })

          panels.forEach((panel, index) => {
            const parts = panel.querySelectorAll('.spotlight-photo, .spotlight-copy > *')
            timeline.addLabel(`member-${index}`, index)
            if (index > 0) timeline.set(panel, { autoAlpha: 1 }, index)
            timeline.fromTo(
              parts,
              { autoAlpha: 0, y: 20, clipPath: 'inset(0 0 12% 0)' },
              { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.5, stagger: 0.06 },
              index,
            )
            if (index < panels.length - 1) {
              timeline.to(parts, { autoAlpha: 0, y: -12, duration: 0.3, stagger: 0.03 }, index + 0.72)
              timeline.set(panel, { autoAlpha: 0 }, index + 1)
            }
          })
          timeline.to('.spotlight-progress span', { scaleX: 1, ease: 'none', duration: panels.length - 1 }, 0)
        }
      },
    )
  }, root)

  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  ctx?.revert?.()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="people-page bg-[#E7E8E9] text-[#12365B]">
    <section class="people-promise-section">
      <div class="people-promise-layout">
        <div class="promise-copy">
          <p class="people-eyebrow">{{ peoplePageStory.promise.kicker }}</p>
          <h1>
            <span>{{ peoplePageStory.promise.headline[0] }}</span>
            <span>{{ peoplePageStory.promise.headline[1] }}</span>
          </h1>
          <p class="promise-support">{{ peoplePageStory.promise.support }}</p>
          <div class="promise-stats" aria-label="Blue Nest team statistics">
            <div v-for="stat in peoplePageStory.promise.stats" :key="stat.label" class="promise-stat">
              <strong :data-value="stat.value">{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
          <a class="promise-scroll" href="#team">
            Meet the team <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div class="promise-portraits" aria-label="Portraits of the Blue Nest team">
          <figure class="promise-portrait promise-portrait-lead">
            <img :src="people[0].photo" :alt="people[0].name" fetchpriority="high" />
            <figcaption>{{ people[0].name }} <span>01</span></figcaption>
          </figure>
          <figure
            v-for="(member, index) in people.slice(1)"
            :key="member.id"
            class="promise-portrait"
          >
            <img :src="member.photo" :alt="member.name" />
            <figcaption>{{ member.name }} <span>{{ String(index + 2).padStart(2, '0') }}</span></figcaption>
          </figure>
          <div class="promise-caption">BLUE NEST · THE PEOPLE BEHIND THE WORK</div>
        </div>
      </div>
    </section>

    <section id="team" class="people-team-section mx-auto max-w-[1440px] px-5 pb-20 md:px-10 lg:px-16">
      <div class="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-[11px] font-medium uppercase tracking-[0.26em] text-[#12365B]/60">
            {{ peoplePageStory.team.kicker }}
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.06em] md:text-5xl">
            {{ peoplePageStory.team.headline }}
          </h2>
          <p class="team-support">{{ peoplePageStory.team.support }}</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in roleFilters"
            :key="filter"
            type="button"
            :aria-pressed="selectedRole === filter"
            class="filter-chip rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B8AD0] focus-visible:ring-offset-2"
            :class="selectedRole === filter ? 'border-[#12365B] bg-[#12365B] text-white' : 'border-[#12365B]/10 bg-white text-[#12365B] hover:border-[#1B8AD0] hover:text-[#1B8AD0]'"
            @click="selectedRole = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div v-if="filteredMembers.length" ref="teamGrid" class="people-grid relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="(member, index) in filteredMembers"
          :key="member.id"
          class="people-card"
          :class="index % 3 === 1 ? 'people-card-offset-down' : index % 3 === 2 ? 'people-card-offset-up' : ''"
        >
        <button
          type="button"
          :aria-label="`Open profile for ${member.name}`"
          class="people-card-button group"
          @click="openMember(member)"
        >
          <div class="relative overflow-hidden bg-[#E7E8E9]">
            <img
              :src="member.photo"
              :alt="member.name"
              class="aspect-[4/5] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
              loading="eager"
            />
            <span class="absolute bottom-4 left-4 rounded-full border border-[#12365B]/10 bg-white/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-[#12365B] backdrop-blur-sm">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>

          <div class="flex flex-1 flex-col gap-4 p-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[10px] uppercase tracking-[0.2em] text-[#12365B]/50">{{ member.role }}</p>
                <h3 class="mt-2 text-[1.5rem] font-semibold leading-none tracking-[-0.06em] text-[#12365B] md:text-[1.8rem]">
                  {{ member.name }}
                </h3>
              </div>
              <span class="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#1B8AD0]/20 bg-[#1B8AD0]/5 text-xl text-[#1B8AD0]" aria-hidden="true">↗</span>
            </div>

            <p class="relative inline-block w-fit text-sm leading-6 text-[#12365B]/70 after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#1B8AD0] after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
              {{ member.owned }}
            </p>
          </div>
        </button>
        </article>
      </div>

      <p v-else class="rounded-[1.5rem] border border-[#12365B]/10 bg-white px-5 py-8 text-sm text-[#12365B]/70">
        No team members match this filter yet.
      </p>
    </section>

    <section ref="spotlight" class="people-spotlight-section">
      <div class="spotlight-heading">
        <p class="people-eyebrow">{{ peoplePageStory.proof.kicker }}</p>
        <h2>{{ peoplePageStory.proof.headline }}</h2>
        <p>{{ peoplePageStory.proof.support }}</p>
      </div>
      <div class="spotlight-stage" :style="{ '--member-count': people.length }">
        <article
          v-for="(member, index) in people"
          :key="member.id"
          class="spotlight-member"
          :class="{ 'spotlight-member-first': index === 0 }"
          :aria-label="`${member.name}, ${member.role}`"
        >
          <div class="spotlight-photo">
            <img :src="member.photo" :alt="member.name" />
            <span>{{ String(index + 1).padStart(2, '0') }} / {{ String(people.length).padStart(2, '0') }}</span>
          </div>
          <div class="spotlight-copy">
            <p class="people-eyebrow">{{ member.role }}</p>
            <h3>{{ member.name }}</h3>
            <p class="spotlight-bio">{{ member.shortBio }}</p>
            <div class="spotlight-skills" aria-label="Skills">
              <span v-for="skill in member.skills.slice(0, 3)" :key="skill">{{ skill }}</span>
            </div>
            <a :href="member.projectLink" class="spotlight-project">
              <span><small>Selected contribution</small>{{ member.signatureProject }}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
      <nav class="spotlight-roster" aria-label="Choose a team member">
        <button
          v-for="(member, index) in people"
          :key="member.id"
          type="button"
          :aria-label="`Scroll to ${member.name}`"
          :aria-current="activeSpotlightIndex === index ? 'true' : undefined"
          @click="scrollToSpotlight(index)"
        >
          <img :src="member.photo" :alt="''" />
        </button>
      </nav>
      <div class="spotlight-progress" aria-hidden="true"><span></span></div>
    </section>

    <section class="people-proof-section mx-auto max-w-[1440px] px-5 pb-24 md:px-10 lg:px-16">
      <div class="rounded-[2rem] border border-[#12365B]/10 bg-[#12365B] px-6 py-10 text-white md:px-10 md:py-12">
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-[11px] font-medium uppercase tracking-[0.26em] text-white/60">
              {{ peoplePageStory.values.kicker }}
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.06em] md:text-5xl">
              {{ peoplePageStory.values.headline }}
            </h2>
          </div>
        </div>

        <div class="principles-grid mt-10 grid gap-4 md:grid-cols-3">
          <article v-for="value in peoplePageStory.values.values" :key="value.number" class="principle-card rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <p class="text-[11px] uppercase tracking-[0.22em] text-[#1B8AD0]">{{ value.number }}</p>
            <h3 class="mt-4 text-2xl font-semibold tracking-[-0.05em] text-white">{{ value.title }}</h3>
          </article>
        </div>
      </div>
    </section>

    <section class="people-invite-section mx-auto max-w-[1440px] px-5 pb-24 md:px-10 lg:px-16">
      <div class="flex flex-col items-center gap-6 rounded-[2rem] border border-[#12365B]/10 bg-[#E7E8E9] px-6 py-12 text-center md:px-12">
        <p class="text-[11px] font-medium uppercase tracking-[0.26em] text-[#12365B]/60">
          {{ peoplePageStory.invite.kicker }}
        </p>
        <h2 class="max-w-[760px] text-3xl font-semibold tracking-[-0.06em] md:text-6xl">
          {{ peoplePageStory.invite.headline }}
        </h2>
        <p class="max-w-[620px] text-base text-[#12365B]/75 md:text-lg">
          {{ peoplePageStory.invite.support }}
        </p>
        <a
          :href="peoplePageStory.invite.ctaHref"
          class="inline-flex items-center justify-center rounded-full bg-[#12365B] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#1B8AD0]"
        >
          {{ peoplePageStory.invite.button }}
        </a>
      </div>
    </section>

    <div
      v-if="overlayOpen && selectedMember"
      class="people-profile-overlay"
      @click.self="closeMember()"
    >
      <div
        ref="profileDialog"
        class="people-profile-dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="`${selectedMember.name} profile`"
      >
        <div class="flex items-center justify-between border-b border-[#12365B]/10 px-5 py-4 md:px-8">
          <p class="text-[10px] uppercase tracking-[0.24em] text-[#12365B]/60">Team profile</p>
          <button type="button" class="rounded-full border border-[#12365B]/15 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[#12365B] transition hover:border-[#1B8AD0] hover:text-[#1B8AD0]" @click="closeMember()">
            Close
          </button>
        </div>

        <div class="grid gap-6 p-5 md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div class="overflow-hidden rounded-[1.5rem] bg-white">
            <img :src="selectedMember.photo" :alt="selectedMember.name" class="aspect-[4/5] w-full object-cover" loading="eager" />
          </div>

          <div class="flex flex-col justify-between">
            <div>
              <p class="text-[10px] uppercase tracking-[0.24em] text-[#1B8AD0]">{{ selectedMember.role }}</p>
              <h3 class="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[#12365B] md:text-5xl">
                {{ selectedMember.name }}
              </h3>
              <p class="mt-4 text-base leading-7 text-[#12365B]/75">{{ selectedMember.bio }}</p>
              <blockquote class="mt-6 border-l border-[#1B8AD0] pl-4 text-lg italic text-[#12365B]">
                “{{ selectedMember.quote }}”
              </blockquote>
            </div>

            <div class="mt-8">
              <p class="text-[10px] uppercase tracking-[0.2em] text-[#12365B]/55">Core strengths</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="skill in selectedMember.skills" :key="skill" class="rounded-full border border-[#12365B]/10 bg-white px-3 py-2 text-xs uppercase tracking-[0.14em] text-[#12365B]">
                  {{ skill }}
                </span>
              </div>
            </div>

            <a class="profile-project-link" :href="selectedMember.projectLink">
              {{ selectedMember.signatureProject }} <span aria-hidden="true">↗</span>
            </a>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <a
                v-for="social in selectedMember.socials"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noreferrer"
                class="rounded-full border border-[#12365B]/15 bg-white px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#12365B] transition hover:border-[#1B8AD0] hover:text-[#1B8AD0]"
              >
                {{ social.label }}
              </a>
            </div>

            <div class="mt-8 flex items-center justify-between border-t border-[#12365B]/10 pt-4">
              <button type="button" class="text-sm uppercase tracking-[0.2em] text-[#12365B]/70 transition hover:text-[#1B8AD0]" @click="changeMember(-1)">
                Prev
              </button>
              <button type="button" class="text-sm uppercase tracking-[0.2em] text-[#12365B]/70 transition hover:text-[#1B8AD0]" @click="changeMember(1)">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.people-page {
  min-height: 100vh;
  overflow: hidden;
  background: #e7e8e9;
  color: #12365b;
}

.people-promise-section {
  width: min(100%, 1920px);
  min-height: min(900px, 100svh);
  margin-inline: auto;
  padding: 132px clamp(24px, 6.1vw, 112px) 56px;
}

.people-promise-layout {
  display: grid;
  min-height: min(650px, calc(100svh - 188px));
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(40px, 7vw, 112px);
}

.promise-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.people-eyebrow {
  margin: 0;
  color: rgb(18 54 91 / 62%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.15em;
  line-height: 1.5;
  text-transform: uppercase;
}

.promise-copy h1 {
  margin: 0;
  color: #12365b;
  font-size: clamp(56px, 5.2vw, 88px);
  font-weight: 600;
  letter-spacing: -0.095em;
  line-height: 0.88;
}

.promise-copy h1 span {
  display: block;
}

.promise-copy h1 span:last-child {
  color: #1b8ad0;
}

.promise-support {
  max-width: 430px;
  margin: 0;
  color: #0a1f36;
  font-size: clamp(15px, 1.3vw, 18px);
  line-height: 1.75;
}

.promise-stats {
  display: grid;
  width: min(100%, 470px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  padding-top: 18px;
  border-top: 1px solid rgb(18 54 91 / 20%);
}

.promise-stat strong {
  display: block;
  color: #12365b;
  font-size: clamp(32px, 3.4vw, 48px);
  font-weight: 600;
  letter-spacing: -0.08em;
  line-height: 1;
}

.promise-stat span {
  display: block;
  margin-top: 8px;
  color: rgb(18 54 91 / 62%);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.08em;
  line-height: 1.6;
  text-transform: uppercase;
}

.promise-scroll {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #12365b;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.promise-scroll span {
  color: #1b8ad0;
  font-size: 18px;
}

.promise-portraits {
  position: relative;
  display: grid;
  min-width: 0;
  height: min(610px, 66svh);
  grid-template-columns: 1.12fr 0.88fr 0.88fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 12px;
  border: 1px solid rgb(18 54 91 / 12%);
  border-radius: 26px;
  background: white;
  box-shadow: 0 28px 80px rgb(18 54 91 / 7%);
}

.promise-portrait {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  margin: 0;
  border-radius: 16px;
  background: #d8dadd;
}

.promise-portrait-lead {
  grid-row: 1 / 3;
}

.promise-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promise-portrait figcaption {
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 11px;
  border: 1px solid rgb(255 255 255 / 35%);
  border-radius: 999px;
  background: rgb(10 31 54 / 68%);
  color: white;
  font-size: 10px;
  backdrop-filter: blur(8px);
}

.promise-portrait figcaption span {
  color: #8cccf2;
  font-family: var(--mono);
  font-size: 8px;
}

.promise-caption {
  position: absolute;
  right: 15px;
  bottom: -24px;
  color: rgb(18 54 91 / 55%);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.12em;
}

.people-page > section {
  width: min(100%, 1440px);
  margin-inline: auto;
  padding-inline: clamp(20px, 5vw, 72px);
}

.people-page > .people-hero-section {
  padding-top: 118px;
  padding-bottom: 56px;
}

.people-page > .people-hero-section > div {
  position: relative;
  min-height: min(710px, calc(100svh - 132px));
  overflow: hidden;
  padding: clamp(24px, 4vw, 56px);
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 32px;
  background:
    radial-gradient(circle at 12% 12%, rgb(27 138 208 / 10%), transparent 35%),
    rgb(255 255 255 / 76%);
  box-shadow: 0 28px 80px rgb(18 54 91 / 4%);
}

.people-page > .people-hero-section > div > svg {
  position: absolute;
  right: -18px;
  bottom: -24px;
  width: 220px;
  height: 220px;
  pointer-events: none;
}

.people-page > .people-hero-section > div > div.relative {
  position: relative;
  z-index: 1;
  display: grid;
  min-height: inherit;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  align-items: start;
  gap: clamp(28px, 5vw, 72px);
}

.people-hero-copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  padding-top: clamp(24px, 5vh, 48px);
}

.people-hero-copy p,
.people-page h1,
.people-page h2,
.people-page h3 {
  margin-top: 0;
}

.people-hero-copy > p:first-child,
.people-page section > div > div > p:first-child {
  margin-bottom: 0;
  color: rgb(18 54 91 / 62%);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  line-height: 1.5;
  text-transform: uppercase;
}

.people-hero-copy h1 {
  margin-bottom: 0;
  font-size: clamp(52px, 6vw, 78px);
  font-weight: 600;
  letter-spacing: -0.085em;
  line-height: 0.91;
}

.people-hero-copy h1 span {
  display: block;
}

.people-hero-copy h1 span + span {
  color: #1b8ad0;
}

.people-hero-copy > p:not(:first-child) {
  max-width: 520px;
  margin-bottom: 0;
  color: rgb(18 54 91 / 76%);
  font-size: clamp(15px, 1.3vw, 18px);
  line-height: 1.7;
}

.people-hero-copy > div {
  display: grid;
  width: min(100%, 540px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid rgb(18 54 91 / 16%);
}

.people-hero-copy > div strong {
  display: block;
  font-size: clamp(27px, 3vw, 40px);
  letter-spacing: -0.06em;
  line-height: 1.1;
}

.people-hero-copy > div span {
  display: block;
  margin-top: 6px;
  color: rgb(18 54 91 / 60%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  line-height: 1.5;
  text-transform: uppercase;
}

.mini-spotlight {
  display: flex;
  justify-content: flex-end;
  align-self: center;
  min-width: 0;
}

.mini-spotlight > div {
  position: relative;
  width: min(100%, 480px);
  padding: 16px;
  overflow: hidden;
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 28px;
  background: #12365b;
  color: white;
  box-shadow: 0 22px 56px rgb(18 54 91 / 14%);
}

.people-spotlight-glow {
  position: absolute;
  z-index: 0;
  top: 40px;
  left: -32px;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: rgb(27 138 208 / 25%);
  filter: blur(34px);
  pointer-events: none;
}

.people-spotlight-heading {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgb(255 255 255 / 12%);
}

.people-spotlight-heading p,
.people-spotlight-meta p {
  margin: 0;
}

.people-spotlight-heading p {
  color: rgb(255 255 255 / 60%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.people-spotlight-heading h2 {
  margin: 5px 0 0;
  color: white;
  font-size: 20px;
  letter-spacing: -0.04em;
}

.people-spotlight-heading span {
  flex: 0 0 auto;
  padding: 8px 12px;
  border-radius: 999px;
  background: #1b8ad0;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.people-spotlight-collage {
  position: relative;
  display: grid;
  height: clamp(280px, 34vw, 420px);
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 10px;
  margin-top: 14px;
}

.people-spotlight-collage > div {
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 16px;
  background: rgb(255 255 255 / 5%);
}

.people-spotlight-feature img {
  aspect-ratio: auto;
}

.people-spotlight-thumbs {
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 8px;
  border: 0;
  background: transparent;
}

.people-spotlight-thumbs > div {
  min-height: 0;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 12px;
}

.mini-spotlight img {
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: cover;
}

.people-spotlight-meta {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
}

.people-spotlight-meta p {
  color: rgb(255 255 255 / 72%);
  font-size: 12px;
  line-height: 1.6;
}

.people-spotlight-meta button {
  flex: 0 0 auto;
  padding: 10px 14px;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 999px;
  background: rgb(255 255 255 / 5%);
  color: white;
  cursor: pointer;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.people-page > .people-story-section {
  padding-bottom: 76px;
}

.people-page > .people-story-section > div {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(24px, 5vw, 72px);
  padding: clamp(24px, 4vw, 52px);
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 30px;
  background: white;
}

.people-page > .people-story-section h2,
.people-page > .people-team-section h2,
.people-page > .people-proof-section h2,
.people-page > .people-invite-section h2 {
  margin-bottom: 0;
  color: #12365b;
  font-size: clamp(30px, 4vw, 54px);
  letter-spacing: -0.065em;
  line-height: 1;
}

.people-page > .people-story-section > div > div:first-child > p:last-child {
  max-width: 480px;
  margin: 24px 0 0;
  color: rgb(18 54 91 / 74%);
  font-size: 16px;
  line-height: 1.8;
}

.people-page > .people-story-section > div > div:last-child {
  padding: 10px;
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 24px;
  background: #e7e8e9;
}

.people-page > .people-story-section > div > div:last-child > div {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: 10px;
}

.people-page > .people-story-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.people-page > .people-story-section > div > div:last-child > div > div {
  min-width: 0;
  overflow: hidden;
  border-radius: 18px;
}

.people-page > .people-story-section > div > div:last-child > div > div:first-child img {
  aspect-ratio: 4 / 5;
}

.people-page > .people-story-section > div > div:last-child > div > div:last-child {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.people-page > .people-story-section > div > div:last-child > div > div:last-child > div:first-child {
  padding: 22px;
  background: #12365b;
  color: white;
}

.people-page > .people-story-section > div > div:last-child > div > div:last-child > div:first-child p:last-child {
  margin: 16px 0 0;
  color: white;
  font-size: clamp(28px, 3.2vw, 46px);
  font-weight: 600;
  letter-spacing: -0.06em;
  line-height: 1;
}

.people-page > .people-story-section > div > div:last-child > div > div:last-child > div:last-child img {
  aspect-ratio: 3 / 2;
}

.people-page > .people-team-section {
  padding-top: 64px;
  padding-bottom: 88px;
  scroll-margin-top: 94px;
}

.people-page > .people-team-section > div:first-child {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 30px;
}

.people-page > .people-team-section > div:first-child h2 {
  margin-top: 14px;
}

.team-support {
  margin: 12px 0 0;
  color: rgb(18 54 91 / 72%);
  font-size: 14px;
  line-height: 1.65;
}

.people-page > .people-team-section > div:first-child > div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-chip {
  padding: 10px 14px;
  border: 1px solid rgb(18 54 91 / 14%);
  border-radius: 999px;
  background: white;
  color: #12365b;
  cursor: pointer;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.filter-chip[aria-pressed='true'] {
  border-color: #12365b;
  background: #12365b;
  color: white;
}

.people-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 22px;
}

.people-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 24px;
  background: white;
  color: #12365b;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 12px 36px rgb(18 54 91 / 4%);
  transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;
}

.people-card-button {
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: inherit;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.people-card-offset-down {
  position: relative;
  top: 24px;
}

.people-card-offset-up {
  position: relative;
  top: -12px;
}

.people-card:hover {
  transform: translateY(-5px);
  border-color: rgb(18 54 91 / 22%);
  box-shadow: 0 20px 48px rgb(18 54 91 / 10%);
}

.people-card-button > div:first-child {
  position: relative;
  overflow: hidden;
  background: #e7e8e9;
}

.people-card-button > div:first-child img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  transition: transform 500ms ease;
}

.people-card:hover .people-card-button > div:first-child img {
  transform: scale(1.03);
}

.people-card-button > div:first-child span {
  position: absolute;
  bottom: 14px;
  left: 14px;
  padding: 7px 10px;
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 999px;
  background: rgb(255 255 255 / 88%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.1em;
}

.people-card-button > div:last-child {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.people-card-button > div:last-child > div {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.people-card p {
  margin: 0;
}

.people-card-button > div:last-child p:first-child {
  color: rgb(18 54 91 / 55%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  line-height: 1.5;
  text-transform: uppercase;
}

.people-card h3 {
  margin: 8px 0 0;
  color: #12365b;
  font-size: clamp(22px, 2vw, 30px);
  letter-spacing: -0.06em;
  line-height: 1.05;
}

.people-card-button > div:last-child > div > span {
  display: inline-grid;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgb(27 138 208 / 25%);
  border-radius: 50%;
  color: #1b8ad0;
}

.people-card-button > div:last-child > p:last-child {
  position: relative;
  width: fit-content;
  color: rgb(18 54 91 / 74%);
  font-size: 13px;
  line-height: 1.6;
}

.people-card-button > div:last-child > p:last-child::after {
  position: absolute;
  right: 0;
  bottom: -3px;
  left: 0;
  height: 2px;
  background: #1b8ad0;
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 250ms ease;
}

.people-card:hover .people-card-button > div:last-child > p:last-child::after {
  transform: scaleX(1);
}

.people-page > .people-team-section > p {
  padding: 24px;
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 20px;
  background: white;
}

.people-spotlight-section {
  position: relative;
  display: grid;
  width: min(100%, 1920px);
  min-height: 100svh;
  grid-template-columns: minmax(210px, 0.34fr) minmax(0, 1fr) 46px;
  align-items: center;
  gap: clamp(24px, 4vw, 72px);
  margin-inline: auto;
  padding: 90px clamp(24px, 6.1vw, 112px);
  overflow: hidden;
  background: #0a1f36;
  color: white;
}

.spotlight-heading {
  position: relative;
  z-index: 2;
}

.spotlight-heading .people-eyebrow {
  color: #8cccf2;
}

.spotlight-heading h2 {
  margin: 18px 0;
  color: white;
  font-size: clamp(38px, 5vw, 72px);
  letter-spacing: -0.08em;
  line-height: 0.95;
}

.spotlight-heading > p:last-child {
  max-width: 280px;
  margin: 0;
  color: rgb(255 255 255 / 68%);
  font-size: 14px;
  line-height: 1.7;
}

.spotlight-stage {
  position: relative;
  min-width: 0;
  height: min(660px, 76svh);
}

.spotlight-member {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  align-items: center;
  gap: clamp(24px, 4vw, 64px);
  visibility: hidden;
  opacity: 0;
}

.spotlight-member-first {
  visibility: visible;
  opacity: 1;
}

.spotlight-photo {
  position: relative;
  height: min(610px, 70svh);
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 20px;
  background: #12365b;
  clip-path: inset(0);
}

.spotlight-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotlight-photo > span {
  position: absolute;
  right: 14px;
  bottom: 14px;
  padding: 8px 11px;
  border-radius: 999px;
  background: #1b8ad0;
  color: white;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.spotlight-copy {
  min-width: 0;
}

.spotlight-copy .people-eyebrow {
  color: #8cccf2;
}

.spotlight-copy h3 {
  margin: 14px 0 18px;
  color: white;
  font-size: clamp(42px, 5vw, 76px);
  letter-spacing: -0.08em;
  line-height: 0.95;
}

.spotlight-bio {
  max-width: 520px;
  margin: 0;
  color: rgb(255 255 255 / 78%);
  font-size: clamp(15px, 1.35vw, 18px);
  line-height: 1.7;
}

.spotlight-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.spotlight-skills span {
  padding: 9px 12px;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 999px;
  color: white;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.08em;
}

.spotlight-project {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  max-width: 520px;
  margin-top: 34px;
  padding: 18px 0;
  border-top: 1px solid rgb(255 255 255 / 20%);
  border-bottom: 1px solid rgb(255 255 255 / 20%);
  color: white;
  font-size: 16px;
}

.spotlight-project small {
  display: block;
  margin-bottom: 8px;
  color: rgb(255 255 255 / 56%);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.spotlight-project > span:last-child {
  color: #65b7ec;
  font-size: 22px;
}

.spotlight-roster {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.spotlight-roster button {
  width: 38px;
  height: 38px;
  padding: 2px;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 24%);
  border-radius: 50%;
  background: transparent;
  opacity: 0.52;
  cursor: pointer;
  transition: opacity 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.spotlight-roster button[aria-current='true'] {
  border-color: #1b8ad0;
  opacity: 1;
  transform: scale(1.12);
}

.spotlight-roster img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.spotlight-progress {
  position: absolute;
  right: clamp(24px, 6.1vw, 112px);
  bottom: 42px;
  left: clamp(24px, 6.1vw, 112px);
  height: 2px;
  overflow: hidden;
  background: rgb(255 255 255 / 20%);
}

.spotlight-progress span {
  display: block;
  width: 100%;
  height: 100%;
  background: #1b8ad0;
  transform: scaleX(0);
  transform-origin: left;
}

.people-page > .people-proof-section {
  padding-bottom: 80px;
}

.people-page > .people-proof-section > div {
  padding: clamp(28px, 5vw, 64px);
  border-radius: 30px;
  background: #12365b;
  color: white;
}

.people-page > .people-proof-section h2 {
  color: white;
}

.people-page > .people-proof-section > div > p {
  max-width: 660px;
  color: rgb(255 255 255 / 76%);
  line-height: 1.7;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 32px;
}

.principle-card {
  padding: 22px;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 20px;
  background: rgb(255 255 255 / 5%);
}

.principle-card > p:first-child {
  color: #65b7ec;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
}

.principle-card h3 {
  margin: 20px 0 0;
  color: white;
  font-size: clamp(20px, 2vw, 28px);
  letter-spacing: -0.05em;
  line-height: 1.1;
}

.principle-card > p:last-child {
  margin: 12px 0 0;
  color: rgb(255 255 255 / 76%);
  font-size: 13px;
  line-height: 1.7;
}

.people-page > .people-invite-section {
  padding-bottom: 88px;
}

.people-page > .people-invite-section > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: clamp(36px, 7vw, 84px) 24px;
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 30px;
  background: white;
  text-align: center;
}

.people-page > .people-invite-section h2 {
  max-width: 760px;
}

.people-page > .people-invite-section > div > p:not(:first-child) {
  max-width: 620px;
  margin: 0;
  color: rgb(18 54 91 / 75%);
  font-size: 16px;
  line-height: 1.7;
}

.people-page > .people-invite-section a {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border-radius: 999px;
  background: #12365b;
  color: white;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background 180ms ease, transform 180ms ease;
}

.people-page > .people-invite-section a:hover {
  transform: translateY(-2px);
  background: #1b8ad0;
}

.people-profile-overlay {
  position: fixed;
  z-index: 50;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 24px;
  background: rgb(10 31 54 / 76%);
  backdrop-filter: blur(8px);
}

.people-profile-dialog {
  width: min(100%, 960px);
  max-height: calc(100svh - 48px);
  overflow-y: auto;
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 28px;
  background: #e7e8e9;
  box-shadow: 0 40px 120px rgb(10 31 54 / 30%);
}

.people-profile-dialog > div:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid rgb(18 54 91 / 10%);
}

.people-profile-dialog > div:first-child p {
  margin: 0;
  color: rgb(18 54 91 / 65%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.people-profile-dialog > div:first-child button,
.people-profile-dialog a,
.people-profile-dialog > div:last-child > div:last-child button {
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid rgb(18 54 91 / 18%);
  border-radius: 999px;
  background: white;
  color: #12365b;
  cursor: pointer;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.people-profile-dialog > div:nth-child(2) {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 24px;
  padding: 24px;
}

.people-profile-dialog > div:nth-child(2) > div:first-child {
  overflow: hidden;
  border-radius: 20px;
  background: white;
}

.people-profile-dialog > div:nth-child(2) > div:first-child img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.people-profile-dialog > div:nth-child(2) > div:last-child {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.people-profile-dialog h3 {
  margin: 10px 0 0;
  font-size: clamp(32px, 4vw, 54px);
  letter-spacing: -0.06em;
  line-height: 1;
}

.people-profile-dialog p,
.people-profile-dialog blockquote {
  color: rgb(18 54 91 / 76%);
  font-size: 14px;
  line-height: 1.75;
}

.people-profile-dialog blockquote {
  margin: 20px 0 0;
  padding-left: 16px;
  border-left: 2px solid #1b8ad0;
  color: #12365b;
  font-size: 16px;
  font-style: italic;
}

.people-profile-dialog > div:nth-child(2) > div:last-child > div {
  margin-top: 20px;
}

.people-profile-dialog > div:nth-child(2) > div:last-child > div > p:first-child {
  margin: 0;
  color: rgb(18 54 91 / 55%);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.people-profile-dialog > div:nth-child(2) > div:last-child > div > div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.people-profile-dialog > div:nth-child(2) > div:last-child > div > div > span {
  padding: 8px 11px;
  border: 1px solid rgb(18 54 91 / 10%);
  border-radius: 999px;
  background: white;
  font-size: 11px;
}

.people-profile-dialog a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.people-profile-dialog .profile-project-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  margin-top: 22px;
  padding-inline: 14px;
  border-color: rgb(18 54 91 / 12%);
  background: rgb(255 255 255 / 65%);
  font-size: 11px;
}

.people-profile-dialog .profile-project-link span {
  color: #1b8ad0;
  font-size: 18px;
}

.people-profile-dialog > div:nth-child(2) > div:last-child > div:last-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid rgb(18 54 91 / 10%);
}

.people-page button:focus-visible,
.people-page a:focus-visible {
  outline: 3px solid #1b8ad0;
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .people-promise-section {
    min-height: auto;
    padding-top: 116px;
  }

  .people-promise-layout {
    min-height: 0;
    grid-template-columns: minmax(0, 1fr);
    gap: 42px;
  }

  .promise-copy h1 {
    font-size: clamp(66px, 10vw, 96px);
  }

  .promise-portraits {
    height: min(560px, 62svh);
  }

  .people-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .people-spotlight-section {
    grid-template-columns: minmax(0, 1fr);
  }

  .spotlight-roster {
    flex-direction: row;
  }
}

@media (max-width: 700px) {
  .people-page > .people-team-section {
    padding-top: 40px;
    padding-bottom: 48px;
  }

  .people-promise-section {
    padding: 112px 20px 40px;
  }

  .people-promise-layout {
    gap: 36px;
  }

  .promise-copy {
    gap: 20px;
  }

  .promise-copy h1 {
    font-size: clamp(56px, 13vw, 76px);
  }

  .promise-portraits {
    height: min(440px, 92vw);
    grid-template-columns: 1.15fr 0.85fr 0.85fr;
    gap: 6px;
    padding: 6px;
    border-radius: 18px;
  }

  .promise-portrait {
    border-radius: 10px;
  }

  .promise-portrait figcaption {
    right: 5px;
    bottom: 5px;
    left: 5px;
    padding: 6px;
    font-size: 8px;
  }

  .promise-caption {
    right: 6px;
    bottom: -18px;
    font-size: 6px;
  }

  .mini-spotlight {
    justify-content: stretch;
  }

  .mini-spotlight > div {
    width: 100%;
    max-width: none;
  }

  .people-page > .people-team-section,
  .people-page > .people-proof-section,
  .people-page > .people-invite-section {
    padding-bottom: 48px;
  }

  .people-page > .people-team-section > div:first-child {
    align-items: flex-start;
    flex-direction: column;
  }

  .people-grid,
  .principles-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .people-card-offset-down,
  .people-card-offset-up {
    top: 0;
  }

  .people-spotlight-section {
    display: none;
  }

  .people-profile-overlay {
    align-items: flex-start;
    padding: 12px;
  }

  .people-profile-dialog {
    max-height: calc(100svh - 24px);
  }

  .people-profile-dialog > div:nth-child(2) {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
    padding: 16px;
  }

  .people-profile-dialog > div:nth-child(2) > div:first-child img {
    max-height: 42svh;
  }
}

@media (min-width: 701px) and (max-width: 899px) {
  .people-spotlight-section {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .people-page *,
  .people-page *::before,
  .people-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }

  .people-spotlight-section {
    display: none;
  }
}
</style>
