<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'
import BlueNestLogo from './components/BlueNestLogo.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import AboutPage from './components/about/About.vue'
import PeoplePage from './components/people/People.vue'
import StoryHome from './components/story/StoryHome.vue'
import { destroyLenis, initLenis } from './composables/useLenis.js'
import { aboutStory } from './data/about.js'
import { people, projects, siteCopy } from './data/story.js'

type Page = 'home' | 'work' | 'project' | 'about' | 'people' | 'contact'

const menuOpen = ref(false)
const currentPage = ref<Page>(getPageFromPath(window.location.pathname))
const currentProjectSlug = ref(getProjectSlug(window.location.pathname))
const lenisInstance = shallowRef<Lenis | null>(null)
const darkHeader = computed(() =>
  currentPage.value === 'work' ||
  currentPage.value === 'project' ||
  currentPage.value === 'people' ||
  currentPage.value === 'contact',
)
const selectedProject = computed(() =>
  projects.find((project) => project.slug === currentProjectSlug.value),
)
const revealAnimations: gsap.core.Tween[] = []
const easeOutExpo = (progress: number) =>
  progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

function getPageFromPath(path: string): Page {
  const segments = path.replace(/\/+$/, '').split('/').filter(Boolean)
  if (segments[0] === 'work' && segments[1]) {
    return projects.some((project) => project.slug === segments[1]) ? 'project' : 'work'
  }
  const page = segments[0]
  return page === 'work' || page === 'about' || page === 'people' || page === 'contact'
    ? page
    : 'home'
}

function getProjectSlug(path: string): string {
  const segments = path.replace(/\/+$/, '').split('/').filter(Boolean)
  return segments[0] === 'work' && projects.some((project) => project.slug === segments[1])
    ? (segments[1] ?? '')
    : ''
}

function navigate(path: string) {
  const destination = new URL(path, window.location.href)
  const nextPage = getPageFromPath(destination.pathname)
  const nextProjectSlug = getProjectSlug(destination.pathname)
  const routeChanged =
    nextPage !== currentPage.value || nextProjectSlug !== currentProjectSlug.value

  if (
    window.location.pathname !== destination.pathname ||
    window.location.search !== destination.search ||
    window.location.hash !== destination.hash
  ) {
    window.history.pushState({}, '', destination)
  }

  menuOpen.value = false

  if (!routeChanged) {
    if (destination.hash) {
      scrollToAnchor(destination.hash)
    }
    return
  }

  lenisInstance.value?.stop()
  currentPage.value = nextPage
  currentProjectSlug.value = nextProjectSlug
}

function handlePopState() {
  const page = getPageFromPath(window.location.pathname)
  const projectSlug = getProjectSlug(window.location.pathname)
  const routeChanged = page !== currentPage.value || projectSlug !== currentProjectSlug.value

  if (!routeChanged) {
    if (window.location.hash) {
      scrollToAnchor(window.location.hash)
    } else {
      lenisInstance.value?.scrollTo(0, { immediate: true, force: true })
    }
    menuOpen.value = false
    return
  }

  lenisInstance.value?.stop()
  currentPage.value = page
  currentProjectSlug.value = projectSlug
  menuOpen.value = false
}

function scrollToAnchor(hash: string) {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) {
    return
  }

  if (lenisInstance.value) {
    lenisInstance.value.scrollTo(target, {
      offset: -80,
      duration: 1.4,
      easing: easeOutExpo,
    })
    return
  }

  target.scrollIntoView({
    behavior:
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
        ? 'auto'
        : 'smooth',
    block: 'start',
  })
}

function updatePageTitle(page: Page) {
  document.title =
    page === 'project'
      ? `${selectedProject.value?.name ?? 'Project'} — Blue Nest`
      : siteCopy.titles[page]
}

function updateMetaDescription(page: Page) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!meta) {
    throw new Error('The page description meta tag is missing.')
  }

  meta.content =
    page === 'about'
      ? aboutStory.metaDescription
      : 'Blue Nest is an independent creative studio building thoughtful brands and digital experiences for people moving things forward.'
}

function setupRevealAnimations() {
  revealAnimations.splice(0).forEach((animation) => animation.kill())

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element, index) => {
    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        delay: index % 3 === 0 ? 0 : index % 3 === 1 ? 0.1 : 0.18,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
      },
    )
    revealAnimations.push(animation)
  })
}

onMounted(() => {
  updatePageTitle(currentPage.value)
  updateMetaDescription(currentPage.value)
  lenisInstance.value = initLenis()
  window.addEventListener('popstate', handlePopState)
  setupRevealAnimations()
  ScrollTrigger.refresh()
  lenisInstance.value?.scrollTo(0, { immediate: true })

  if (window.location.hash) {
    nextTick(() => scrollToAnchor(window.location.hash))
  }
})

watch([currentPage, currentProjectSlug], async ([page]) => {
  updatePageTitle(page)
  updateMetaDescription(page)
  lenisInstance.value?.scrollTo(0, { immediate: true, force: true })
  await nextTick()
  setupRevealAnimations()
  lenisInstance.value?.start()
  ScrollTrigger.refresh()

  if (window.location.hash) {
    scrollToAnchor(window.location.hash)
  }
})

watch(currentProjectSlug, (slug) => {
  if (currentPage.value === 'project') {
    document.title = `${projects.find((project) => project.slug === slug)?.name ?? 'Project'} — Blue Nest`
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState)
  revealAnimations.splice(0).forEach((animation) => animation.kill())
  destroyLenis()
})
</script>

<template>
  <div class="site-shell">
    <ScrollProgress :lenis="lenisInstance" />
    <header class="site-header" :class="{ 'site-header-dark': darkHeader }">
      <a class="brand-link" href="/" :aria-label="siteCopy.navigation.home" @click.prevent="navigate('/')">
        <BlueNestLogo class="header-logo" :class="{ 'header-logo-light': darkHeader }" />
      </a>
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        :aria-label="siteCopy.navigation.contactAria"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
      </button>
      <nav class="main-nav" :class="{ 'nav-open': menuOpen }" :aria-label="siteCopy.navigation.mainLabel" data-lenis-prevent>
        <a href="/work#projects" :aria-current="currentPage === 'work' ? 'page' : undefined" @click.prevent="navigate('/work#projects')">{{ siteCopy.navigation.work }}</a>
        <a href="/about#about" :aria-current="currentPage === 'about' ? 'page' : undefined" @click.prevent="navigate('/about#about')">{{ siteCopy.navigation.about }}</a>
        <a href="/people#team" :aria-current="currentPage === 'people' ? 'page' : undefined" @click.prevent="navigate('/people#team')">{{ siteCopy.navigation.people }}</a>
        <a class="nav-contact" href="/contact#contact" :aria-current="currentPage === 'contact' ? 'page' : undefined" @click.prevent="navigate('/contact#contact')">
          {{ siteCopy.navigation.contactCta }} <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>

    <main>
      <StoryHome
        v-if="currentPage === 'home'"
        :lenis="lenisInstance"
        @navigate="navigate"
      />

      <section v-if="currentPage === 'work'" id="projects" class="work-section section-pad">
        <div class="section-heading" data-reveal>
          <div>
            <p class="eyebrow"><span class="section-number">{{ siteCopy.work.number }}</span> {{ siteCopy.work.eyebrow }}</p>
            <h2>{{ siteCopy.work.title[0] }}<br /><em>{{ siteCopy.work.title[1] }}</em></h2>
          </div>
          <p class="section-aside">{{ siteCopy.work.aside[0] }}<br />{{ siteCopy.work.aside[1] }}</p>
        </div>

        <div class="project-grid">
          <article
            v-for="(project, index) in projects"
            :key="project.name"
            class="project-card"
            :class="project.className"
            data-reveal
          >
            <a class="project-link" :href="`/work/${project.slug}`" :aria-label="`${siteCopy.work.viewProject}: ${project.name}`" @click.prevent="navigate(`/work/${project.slug}`)">
              <div class="browser-frame">
                <div class="browser-chrome">
                  <span class="browser-dots"><i></i><i></i><i></i></span>
                  <span class="browser-address">{{ project.name.toLowerCase() }}.studio</span>
                  <span class="browser-menu">•••</span>
                </div>
                <div class="project-image-wrap">
                  <img :src="project.image" :alt="project.label" loading="lazy" />
                  <span class="project-visit" aria-hidden="true">↗</span>
                  <span class="project-image-label">{{ project.name }}</span>
                </div>
              </div>
              <div class="project-meta">
                <div>
                  <span class="project-category">{{ project.category }}</span>
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.description }}</p>
                </div>
                <span class="project-number">0{{ index + 1 }}</span>
              </div>
            </a>
          </article>
        </div>
        <a href="/contact" class="text-link" @click.prevent="navigate('/contact')">{{ siteCopy.work.contact }} <span>{{ siteCopy.work.contactCta }} ↗</span></a>
      </section>

      <article
        v-if="currentPage === 'project' && selectedProject"
        class="project-detail"
        :class="selectedProject.className"
      >
        <section class="project-detail-hero section-pad">
          <a href="/work" class="project-back-link" @click.prevent="navigate('/work')">
            <span aria-hidden="true">←</span> {{ siteCopy.project.back }}
          </a>
          <p class="eyebrow"><span class="section-number">{{ selectedProject.number }} / {{ siteCopy.project.featured }}</span></p>
          <div class="project-detail-heading">
            <h1 :class="{ 'project-title-long': selectedProject.slug === 'apparel-one-indonesia' }">
              {{ selectedProject.name }}
            </h1>
            <p>{{ selectedProject.outcome }}</p>
          </div>
          <div class="project-detail-cover">
            <img :src="selectedProject.image" :alt="selectedProject.label" />
            <span class="project-cover-caption">{{ selectedProject.category }}</span>
          </div>
        </section>

        <section class="project-overview section-pad">
          <div class="project-facts">
            <div>
              <span>{{ siteCopy.project.year }}</span>
              <p>{{ selectedProject.category.split('·').pop()?.trim() }}</p>
            </div>
            <div>
              <span>{{ siteCopy.project.services }}</span>
              <p>{{ selectedProject.role }}</p>
            </div>
          </div>
          <div class="project-overview-copy">
            <p class="eyebrow"><span class="section-number">{{ siteCopy.project.story }}</span></p>
            <h2>{{ selectedProject.overview }}</h2>
          </div>
        </section>

        <section class="project-gallery section-pad" :aria-label="`${selectedProject.name} ${siteCopy.project.gallery}`">
          <figure
            v-for="(image, index) in selectedProject.gallery"
            :key="image.src"
            class="project-gallery-image"
            :class="{ 'gallery-image-wide': index !== 1 }"
            data-reveal
          >
            <img :src="image.src" :alt="image.alt" loading="lazy" />
            <figcaption>{{ selectedProject.name }} · 0{{ index + 1 }}</figcaption>
          </figure>
        </section>

        <section class="project-thinking section-pad">
          <article data-reveal>
            <span>{{ siteCopy.project.challenge.label }}</span>
            <h2>{{ siteCopy.project.challenge.title }}</h2>
            <p>{{ selectedProject.challenge }}</p>
          </article>
          <article data-reveal>
            <span>{{ siteCopy.project.approach.label }}</span>
            <h2>{{ siteCopy.project.approach.title }}</h2>
            <p>{{ selectedProject.approach }}</p>
          </article>
          <article data-reveal>
            <span>{{ siteCopy.project.outcome.label }}</span>
            <h2>{{ siteCopy.project.outcome.title }}</h2>
            <p>{{ selectedProject.result }}</p>
          </article>
        </section>

        <section class="project-next section-pad">
          <p class="eyebrow"><span class="section-number">{{ siteCopy.project.nextEyebrow }}</span></p>
          <h2>{{ siteCopy.project.nextTitle[0] }}<br /><em>{{ siteCopy.project.nextTitle[1] }}</em></h2>
          <div class="project-next-links">
            <a
              v-for="project in projects.filter((item) => item.slug !== selectedProject?.slug)"
              :key="project.slug"
              :href="`/work/${project.slug}`"
              @click.prevent="navigate(`/work/${project.slug}`)"
            >
              <span>{{ project.name }}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a href="/contact" class="home-next-link" @click.prevent="navigate('/contact')">
            {{ siteCopy.project.contact }} <span>↗</span>
          </a>
        </section>
      </article>

      <AboutPage v-if="currentPage === 'about'" :navigate="navigate" :lenis="lenisInstance" />

      <PeoplePage v-if="currentPage === 'people'" :lenis="lenisInstance" />

      <section v-if="currentPage === 'contact'" id="contact" class="contact-section section-pad">
        <div class="contact-nest" aria-hidden="true">
          <svg viewBox="0 0 520 230" fill="none">
            <path d="M16 10C68 148 161 208 260 208S452 148 504 10" />
            <path d="M1 48C75 173 166 226 260 226S445 173 519 48" />
            <path d="M78 1C116 120 188 183 260 183S404 120 442 1" />
            <path d="M151 1C173 92 219 151 260 151S347 92 369 1" />
            <path d="M16 10C171 62 349 62 504 10" />
            <path d="M1 48C167 97 353 97 519 48" />
            <path d="M34 113C177 150 343 150 486 113" />
            <path d="M100 164C192 187 328 187 420 164" />
          </svg>
        </div>
        <div class="contact-content" data-reveal>
          <p class="eyebrow"><span class="section-number">{{ siteCopy.contact.number }}</span> {{ siteCopy.contact.eyebrow }}</p>
          <h2>{{ siteCopy.contact.title[0] }}<br />{{ siteCopy.contact.title[1] }} <em>{{ siteCopy.contact.emphasis }}</em></h2>
          <a :href="`mailto:${siteCopy.contact.email}`" class="contact-link">
            {{ siteCopy.contact.cta }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <BlueNestLogo class="footer-watermark" aria-hidden="true" />
      <div class="footer-main">
        <a class="footer-brand" href="/" :aria-label="siteCopy.navigation.home" @click.prevent="navigate('/')">
          {{ siteCopy.footer.brand }} <span aria-hidden="true">↗</span>
        </a>
        <div class="footer-invitation">
          <p class="eyebrow"><span class="section-number">{{ siteCopy.footer.invitation }}</span></p>
          <a class="footer-email" :href="`mailto:${siteCopy.footer.email}`">{{ siteCopy.footer.email }}</a>
        </div>
        <nav :aria-label="siteCopy.navigation.footerLabel">
          <a href="/work" @click.prevent="navigate('/work')">{{ siteCopy.navigation.work }}</a>
          <a href="/about" @click.prevent="navigate('/about')">{{ siteCopy.navigation.about }}</a>
          <a href="/people" @click.prevent="navigate('/people')">{{ siteCopy.navigation.people }}</a>
          <a href="/contact" @click.prevent="navigate('/contact')">{{ siteCopy.navigation.contact }}</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>{{ siteCopy.footer.location }}</span>
        <a href="/" @click.prevent="navigate('/')">{{ siteCopy.footer.tagline }}</a>
        <span>{{ siteCopy.footer.copyright }}</span>
      </div>
    </footer>
  </div>
</template>
