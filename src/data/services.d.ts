export interface ServiceEntry {
  id: string
  shortTitle: string
  icon: string
  promise: string
  learnMore: string
}

export interface ServiceDetail {
  id: string
  type: 'web' | 'assistant' | 'language'
  eyebrow: string
  title: string
  visualLabel: string
  visualContent: {
    taskHeading?: string
    calendarHeading?: string
    practiceLabel?: string
    replyLabel?: string
    phrases?: string[]
  }
  description: string
  examples: string[]
  examplesLabel: string
  deliverablesLabel: string
  deliverables: string[]
  bestForLabel: string
  bestFor: string
  cta: string
}

export const servicesPage: {
  metaDescription: string
  hero: {
    eyebrow: string
    headline: Array<{ text: string; accent?: boolean }>
    support: string
    linksLabel: string
    tags: string[]
    scrollCue: string
    links: Array<{ label: string; href: string }>
  }
  bridge: {
    eyebrow: string
    headline: string
    support: string
  }
  overview: {
    eyebrow: string
    headline: string
    services: ServiceEntry[]
  }
  details: ServiceDetail[]
  stickyNavLabel: string
  stickyNavTitle: string
  visualCaption: string
  process: {
    eyebrow: string
    headline: string
    support: string
    steps: Array<{ title: string; line: string }>
  }
  faq: {
    eyebrow: string
    headline: string
    items: Array<{ question: string; answer: string }>
  }
  invite: {
    eyebrow: string
    headline: string
    support: string
    button: string
    href: string
  }
}

export const servicesTiming: {
  duration: number
  stagger: number
  rise: number
  revealStart: string
  ease: string
  stickyOffset: number
  visualAssembly: number
  checklistDraw: number
  phraseReveal: number
  processDraw: number
  faqOpen: number
  faqClose: number
  sectionStagger: number
  visualParallax: number
}
