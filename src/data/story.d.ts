export interface StoryProject {
  slug: string
  number: string
  name: string
  category: string
  description: string
  role: string
  outcome: string
  overview: string
  challenge: string
  approach: string
  result: string
  image: string
  gallery: Array<{ src: string; alt: string }>
  className: string
  label: string
}

export interface StoryPerson {
  name: string
  role: string
  bio: string
  image: string
  imageFit?: 'cover'
  alt: string
  contact: string
}

export interface StoryChapter {
  id: string
  label: string
  number: string
}

export const chapters: StoryChapter[]
export const storyTiming: {
  entrance: number
  splitStagger: number
  sceneOverlap: number
  snapDelay: number
  snapMin: number
  snapMax: number
  teamFrame: number
  projectFrame: number
  magneticEase: number
}
export const storyCopy: {
  spark: {
    chapter: string
    studio: string
    headline: string[]
    intro: string
    smallIdea: string
    scrollCue: string
    signoff: string
  }
  nest: {
    chapter: string
    eyebrow: string
    title: string[]
    intro: string
    manifesto: string[]
    services: Array<{ number: string; title: string; detail: string; type: string }>
  }
  team: { chapter: string; title: string[]; aside: string }
  craft: { chapter: string; title: string[]; aside: string; browserAddress: string; viewLabel: string }
  impact: {
    chapter: string
    title: string[]
    intro: string
    stats: Array<{ value: number; suffix: string; label: string }>
    values: Array<{ number: string; title: string; text: string }>
  }
  next: {
    chapter: string
    title: string[]
    intro: string
    cta: string
    email: string
    marquee: string
    backToTop: string
  }
}
export const siteCopy: {
  titles: Record<'home' | 'work' | 'project' | 'about' | 'people' | 'contact', string>
  navigation: {
    home: string
    mainLabel: string
    footerLabel: string
    work: string
    about: string
    people: string
    contact: string
    contactCta: string
    contactAria: string
  }
  work: {
    number: string
    eyebrow: string
    title: string[]
    aside: string[]
    viewProject: string
    contact: string
    contactCta: string
  }
  project: {
    back: string
    featured: string
    year: string
    services: string
    story: string
    gallery: string
    challenge: { label: string; title: string }
    approach: { label: string; title: string }
    outcome: { label: string; title: string }
    nextEyebrow: string
    nextTitle: string[]
    contact: string
  }
  about: {
    number: string
    eyebrow: string
    stamp: string[]
    title: string[]
    emphasis: string
    description: string
    peopleLink: string
    values: string[]
  }
  people: {
    number: string
    eyebrow: string
    title: string[]
    aside: string[]
    contact: string
    note: string[]
    noteCaption: string
  }
  contact: {
    number: string
    eyebrow: string
    title: string[]
    emphasis: string
    cta: string
    email: string
  }
  footer: {
    brand: string
    invitation: string
    email: string
    location: string
    tagline: string
    copyright: string
  }
}

export const projects: StoryProject[]
export const people: StoryPerson[]
