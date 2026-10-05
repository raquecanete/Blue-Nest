import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { servicesTiming } from '../data/services.js'

export function useServicesMotion(root, activeService, lenis) {
  let context
  let media

  onMounted(async () => {
    await nextTick()
    const page = root.value
    if (!page) return

    const images = [...page.querySelectorAll('img')]
    await Promise.all(
      images.map((image) =>
        image.complete ? Promise.resolve() : image.decode(),
      ),
    )
    await document.fonts.ready
    ScrollTrigger.refresh()

    context = gsap.context(() => {
      media = gsap.matchMedia()

      media.add(
        {
          desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (match) => {
          const reduced = Boolean(match.conditions?.reduced)
          const rise = reduced ? 0 : servicesTiming.rise
          const duration = reduced ? 0.25 : servicesTiming.duration

          gsap.fromTo(
            '.services-hero-line > span',
            reduced ? { autoAlpha: 0 } : { autoAlpha: 0, yPercent: 110 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: reduced ? 0.25 : 0.85,
              stagger: reduced ? 0 : servicesTiming.stagger,
              ease: servicesTiming.ease,
            },
          )

          gsap.utils.toArray('.services-reveal', page).forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: rise },
              {
                autoAlpha: 1,
                y: 0,
                duration,
                ease: servicesTiming.ease,
                scrollTrigger: {
                  trigger: element,
                  start: servicesTiming.revealStart,
                  once: true,
                },
              },
            )
          })

          page.querySelectorAll('.service-section').forEach((section) => {
            const visualWrap = section.querySelector('.service-story-visual')
            const copy = section.querySelector('.service-story-copy')
            const visual = section.querySelector('.service-visual')
            if (!visualWrap || !copy || !visual) return

            const direction = section.classList.contains('service-section-reverse') ? -1 : 1
            const story = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: servicesTiming.revealStart,
                once: true,
              },
            })

            story.fromTo(
              [visualWrap, copy],
              reduced
                ? { autoAlpha: 0 }
                : { autoAlpha: 0, y: servicesTiming.rise, x: (index) => index === 0 ? direction * 18 : 0 },
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                duration: reduced ? 0.25 : servicesTiming.duration,
                stagger: reduced ? 0 : servicesTiming.sectionStagger,
                ease: servicesTiming.ease,
              },
            )

            if (match.conditions?.desktop && !reduced) {
              gsap.to(visualWrap, {
                yPercent: servicesTiming.visualParallax,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.6,
                },
              })
            }

            if (reduced) return

            const visualTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: servicesTiming.revealStart,
                once: true,
              },
            })

            if (section.dataset.serviceType === 'web') {
              visualTimeline.fromTo(
                visual.querySelectorAll('.web-ui-block'),
                { autoAlpha: 0, y: 10 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: servicesTiming.visualAssembly,
                  stagger: 0.1,
                  ease: servicesTiming.ease,
                },
              )
            } else if (section.dataset.serviceType === 'assistant') {
              visualTimeline.fromTo(
                visual.querySelectorAll('.assistant-check'),
                { strokeDashoffset: 14 },
                {
                  strokeDashoffset: 0,
                  duration: servicesTiming.checklistDraw,
                  stagger: 0.14,
                  ease: servicesTiming.ease,
                },
              )
            } else {
              visualTimeline.fromTo(
                visual.querySelectorAll('.language-phrase'),
                { autoAlpha: 0, y: 8 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: servicesTiming.phraseReveal,
                  stagger: 0.2,
                  ease: servicesTiming.ease,
                },
              )
            }
          })

          if (match.conditions?.desktop) {
            const line = page.querySelector('.services-process-line span')
            if (line) {
              gsap.fromTo(
                line,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: '.services-process',
                    start: 'top 72%',
                    end: 'bottom 70%',
                    scrub: 0.5,
                  },
                },
              )
            }
          } else if (match.conditions?.mobile) {
            const line = page.querySelector('.services-process-line span')
            if (line) {
              gsap.fromTo(
                line,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  duration: servicesTiming.processDraw,
                  ease: servicesTiming.ease,
                  scrollTrigger: {
                    trigger: '.services-process',
                    start: servicesTiming.revealStart,
                    once: true,
                  },
                },
              )
            }
          } else {
            const line = page.querySelector('.services-process-line span')
            if (line) gsap.set(line, { scaleX: 1, scaleY: 1 })
          }

          page.querySelectorAll('.service-section').forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => activeService.value = section.id,
              onEnterBack: () => activeService.value = section.id,
            })
          })

        },
        page,
      )
    }, root.value)

    ScrollTrigger.refresh()
  })

  onBeforeUnmount(() => {
    media?.revert()
    context?.revert()
  })

  function scrollTo(target) {
    const section = document.querySelector(target)
    if (!section) return

    if (lenis?.value) {
      lenis.value.scrollTo(section, {
        offset: -servicesTiming.stickyOffset,
        duration: 1,
        easing: (progress) =>
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress),
      })
    } else {
      section.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      })
    }
  }

  return { scrollTo }
}
