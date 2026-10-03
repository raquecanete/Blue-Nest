export interface AboutStat {
  value: number
  prefix?: string
  label: string
}

export interface AboutStory {
  hero: {
    eyebrow: string
    headline: string[]
    support: string
    intro: string
    stats: AboutStat[]
  }
  mission: {
    eyebrow: string
    headline: string
    support: string
  }
  services: {
    eyebrow: string
    headline: string
    items: Array<{ icon: string; title: string; line: string }>
  }
  process: {
    eyebrow: string
    headline: string
    steps: Array<{ title: string; line: string }>
  }
  values: {
    eyebrow: string
    headline: string
    items: Array<{ title: string }>
  }
  team: {
    eyebrow: string
    headline: string
    support: string
    link: string
  }
  invite: {
    eyebrow: string
    headline: string
    support: string
    button: string
    href: string
  }
  metaDescription: string
}

export const aboutStory: AboutStory
export const aboutTiming: {
  duration: number
  stagger: number
  rise: number
  revealStart: string
  ease: string
}
