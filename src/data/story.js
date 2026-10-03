import aoiDashboardImage from '../assets/images/AOI.png'
import aoiDashboardDetailImage from '../assets/images/AOI-2.png'
import aoiWorkbookImage from '../assets/images/AOI-3.png'
import aoiMasterlistImage from '../assets/images/AOI-4.png'
import jamesImage from '../assets/images/james.png'
import kenImage from '../assets/images/ken.png'
import raqueImage from '../assets/images/raque.png'
import renzImage from '../assets/images/renz.jpg'
import sulya1Image from '../assets/images/Sulya-1.png'
import sulya2Image from '../assets/images/Sulya-2.png'
import sulya3Image from '../assets/images/Sulya-3.png'
import sulya4Image from '../assets/images/Sulya-4.png'
import viaImage from '../assets/images/via.png'

export const chapters = [
  { id: 'top', label: 'Spark', number: '01' },
  { id: 'story-nest', label: 'Nest', number: '02' },
  { id: 'story-team', label: 'Team', number: '03' },
  { id: 'story-craft', label: 'Craft', number: '04' },
  { id: 'story-impact', label: 'Impact', number: '05' },
  { id: 'story-next', label: 'Next', number: '06' },
]

export const storyTiming = {
  entrance: 0.8,
  splitStagger: 0.1,
  sceneOverlap: 0.1,
  snapDelay: 0.16,
  snapMin: 0.2,
  snapMax: 0.65,
  teamFrame: 0.82,
  projectFrame: 0.88,
  magneticEase: 0.24,
}

export const storyCopy = {
  spark: {
    chapter: 'CHAPTER 01 — THE SPARK',
    studio: 'Independent digital studio · Est. 2026',
    headline: ['Good things', 'grow together.'],
    intro: 'We build thoughtful brands and digital experiences for people moving things forward.',
    smallIdea: 'Every great product starts as a small idea.',
    scrollCue: 'SCROLL TO EXPLORE',
    signoff: 'STRATEGY · IDENTITY · DIGITAL',
  },
  nest: {
    chapter: 'CHAPTER 02 — THE NEST',
    eyebrow: 'A small studio for',
    title: ['Thoughtful brands.', 'Useful digital things.', 'Good people.'],
    intro:
      'We bring strategy, identity and digital together to help good ideas find their people and make a lasting impression.',
    manifesto: [
      'Good work begins with listening.',
      'Useful can still feel full of wonder.',
      'The best ideas grow together.',
    ],
    services: [
      {
        number: '01',
        title: 'Find the signal.',
        detail: 'Positioning, naming and a clear story that gives your next chapter direction.',
        type: 'STRATEGY',
      },
      {
        number: '02',
        title: 'Make it memorable.',
        detail: 'A distinctive identity system built to feel unmistakably like you.',
        type: 'BRAND & IDENTITY',
      },
      {
        number: '03',
        title: 'Bring it to life.',
        detail:
          'Useful, considered digital experiences that turn good first impressions into lasting ones.',
        type: 'DIGITAL',
      },
    ],
  },
  team: {
    chapter: 'CHAPTER 03 — THE TEAM',
    title: ['Good company', 'makes good work.'],
    aside: 'A close-knit crew with open minds.',
  },
  craft: {
    chapter: 'CHAPTER 04 — THE CRAFT',
    title: ['Made to make', 'a difference.'],
    aside: 'A few good things, made with good people.',
    browserAddress: 'bluenest.studio',
    viewLabel: 'View case study',
  },
  impact: {
    chapter: 'CHAPTER 05 — THE IMPACT',
    title: ['Clear heads.', 'Open minds.'],
    intro:
      'No off-the-shelf answers. We get close, ask better questions and make the right thing together.',
    stats: [
      { value: 5, suffix: '', label: 'GOOD PEOPLE' },
      { value: 3, suffix: '', label: 'CONNECTED DISCIPLINES' },
      { value: 3, suffix: '', label: 'SELECTED PROJECTS' },
    ],
    values: [
      {
        number: '01 — LISTEN',
        title: 'Start with the why.',
        text: 'We get to know your people, your ambitions and the challenge in front of you.',
      },
      {
        number: '02 — MAKE',
        title: 'Shape it together.',
        text: 'We turn what we learn into a clear direction, then bring it to life with care.',
      },
      {
        number: '03 — GROW',
        title: 'Make it matter.',
        text: 'We launch with intention and leave you with something ready for what comes next.',
      },
    ],
  },
  next: {
    chapter: 'CHAPTER 06 — THE NEXT CHAPTER',
    title: ["Let's build", 'yours.'],
    intro: 'Have a thoughtful idea, a big ambition or a knotty problem to untangle?',
    cta: 'Tell us about it',
    email: 'hello@bluenest.studio',
    marquee: 'GOOD THINGS GROW TOGETHER · LET’S MAKE SOMETHING MATTER · ',
    backToTop: 'BACK TO THE BEGINNING',
  },
}

export const siteCopy = {
  titles: {
    home: 'Blue Nest — Good things grow together',
    work: 'Our Work — Blue Nest',
    project: 'Project — Blue Nest',
    about: 'About Us — Blue Nest',
    people: 'People — Blue Nest',
    contact: 'Contact — Blue Nest',
  },
  navigation: {
    home: 'Blue Nest home',
    mainLabel: 'Main navigation',
    footerLabel: 'Footer navigation',
    work: 'Our work',
    about: 'About us',
    people: 'People',
    contact: 'Contact',
    contactCta: 'Let’s talk',
    contactAria: 'Toggle navigation',
  },
  work: {
    number: '01 /',
    eyebrow: 'Selected work',
    title: ['Made to make', 'a difference.'],
    aside: ['A few good things,', 'made with good people.'],
    viewProject: 'View the project',
    contact: 'Have something in mind?',
    contactCta: 'Let’s make it real',
  },
  project: {
    back: 'All work',
    featured: 'FEATURED PROJECT',
    year: 'YEAR',
    services: 'SERVICES',
    story: 'THE STORY',
    gallery: 'project images',
    challenge: {
      label: 'THE CHALLENGE',
      title: 'Make room for what matters.',
    },
    approach: {
      label: 'OUR APPROACH',
      title: 'Thoughtful by design.',
    },
    outcome: {
      label: 'THE OUTCOME',
      title: 'Good things, growing.',
    },
    nextEyebrow: 'KEEP EXPLORING',
    nextTitle: ['More good', 'things ahead.'],
    contact: 'Have a project in mind?',
  },
  about: {
    number: '02 /',
    eyebrow: 'The studio',
    stamp: ['SMALL BY', 'DESIGN'],
    title: ['We believe the best work happens when', 'make room for each other.'],
    emphasis: 'good minds',
    description:
      'Blue Nest is an independent creative studio partnering with people who care about what they put into the world. Strategy, identity and digital, all under one roof.',
    peopleLink: 'Meet the people',
    values: ['CURIOUS BY NATURE', 'CAREFUL BY CRAFT', 'BETTER TOGETHER'],
  },
  people: {
    number: '03 /',
    eyebrow: 'The people',
    title: ['Good company', 'makes good work.'],
    aside: ['A close-knit crew', 'with open minds.'],
    contact: 'Say hello',
    note: ['Small team.', 'Big-hearted work.'],
    noteCaption: 'GOOD THINGS GROW TOGETHER',
  },
  contact: {
    number: '04 /',
    eyebrow: 'A good place to start',
    title: ['Have a good', 'one in'],
    emphasis: 'mind?',
    cta: 'Tell us about it',
    email: 'hello@bluenest.studio',
  },
  footer: {
    brand: 'BLUE NEST',
    invitation: 'LET’S MAKE SOMETHING MATTER',
    email: 'hello@bluenest.studio',
    location: 'INDEPENDENT BY NATURE · BROOKLYN & EVERYWHERE',
    tagline: 'GOOD THINGS GROW TOGETHER',
    copyright: '© BLUE NEST 2025',
  },
}

export const projects = [
  {
    slug: 'apparel-one-indonesia',
    number: '01',
    name: 'Apparel One Indonesia',
    category: 'Catalog platform · 2026',
    description: 'A clearer view of apparel catalogs, activity, and operations.',
    role: 'Dashboard UX, frontend, catalog data workflows',
    outcome: 'A shared workspace for exploring imported apparel data and keeping catalog operations in view.',
    overview:
      'Apparel One Indonesia needed a practical way for employees and administrators to work with imported apparel catalogs. The platform brings dashboard summaries, activity, workbook management, and the CSI masterlist into one connected workspace.',
    challenge:
      'Make large, spreadsheet-based catalogs easier to inspect while supporting distinct employee and administrator workflows.',
    approach:
      'We organized the experience around quick dashboard summaries, searchable catalog rows, workbook import and editing tools, and dedicated administration views.',
    result:
      'A role-based workspace that gives teams a clearer view of catalog data, recent activity, and the tools used to manage imported workbooks.',
    image: aoiDashboardImage,
    gallery: [
      {
        src: aoiDashboardDetailImage,
        alt: 'Apparel One employee dashboard with imported row totals, activity, and status summaries',
      },
      {
        src: aoiWorkbookImage,
        alt: 'Apparel One administrator workbook for importing and managing catalog rows',
      },
      {
        src: aoiMasterlistImage,
        alt: 'Apparel One CSI masterlist showing catalog summary and imported rows',
      },
    ],
    className: 'project-apparel-one',
    label: 'Apparel One Indonesia catalog dashboard',
  },
  {
    slug: 'goodkind',
    number: '02',
    name: 'Goodkind',
    category: 'Brand platform · 2024',
    description: 'Good food, with a little more good in it.',
    role: 'Positioning, identity, digital experience',
    outcome: 'A fresh, feel-good food brand that makes better choices inviting and easy.',
    overview:
      'Goodkind makes everyday food feel like a small act of optimism. We shaped a friendly brand world and an inviting digital storefront to bring its thoughtful ingredients and upbeat spirit to the table.',
    challenge:
      'Stand out in a crowded food market without losing the honest, approachable character at the heart of the business.',
    approach:
      'We built a bright, expressive identity around real food photography, warm language, and a straightforward shopping journey.',
    result:
      'A recognisable brand platform that makes discovering and choosing something good feel effortless.',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=85',
        alt: 'A colorful, freshly prepared Goodkind meal',
      },
      {
        src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1800&q=85',
        alt: 'Fresh vegetables and grains in a nourishing bowl',
      },
      {
        src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1800&q=85',
        alt: 'A spread of fresh ingredients for a Goodkind recipe',
      },
    ],
    className: 'project-goodkind',
    label: 'Goodkind fresh food brand',
  },
  {
    slug: 'sulya',
    number: '03',
    name: 'Sulya',
    category: 'Student workspace · 2026',
    description: 'A smarter way to plan your week.',
    role: 'Brand direction, product concept, interface design',
    outcome: 'A calm student planning workspace that turns schedules into something easier to keep in view.',
    overview:
      'Sulya helps students stay on top of classes, deadlines, and the rhythm of their week. We shaped a workspace that feels clear, personal, and easy to return to when the schedule gets busy.',
    challenge:
      'Create a planning product that feels organized without turning a student’s week into another complicated system.',
    approach:
      'We built a structured dashboard, soft editorial styling, and a clear weekly rhythm around the most important planning actions a student needs every day.',
    result:
      'A focused digital workspace that makes a student schedule feel manageable and visually clear at a glance.',
    image: sulya1Image,
    gallery: [
      { src: sulya2Image, alt: 'Sulya dashboard showing the student inbox, schedule, and weekly overview' },
      { src: sulya3Image, alt: 'Sulya wallpaper studio with a clean schedule-to-wallpaper concept' },
      { src: sulya4Image, alt: 'Sulya landing page showcasing the planning product and workspace concept' },
    ],
    className: 'project-sulya',
    label: 'Sulya student schedule workspace',
  },
]

export const people = [
  {
    name: 'Raque Canete',
    role: 'Creative Frontend Developer & UI/UX Engineer',
    bio: 'Connects thoughtful interface design with accessible, polished frontend experiences.',
    image: raqueImage,
    alt: 'Raque Canete',
    contact: 'mailto:raquecanete60@gmail.com',
  },
  {
    name: 'Renzie Kyle Elarcosa',
    role: 'Lead Developer',
    bio: 'Leads the build from first component to final detail, keeping every experience fast and reliable.',
    image: renzImage,
    alt: 'Renzie Kyle Elarcosa',
    contact: 'mailto:hello@bluenest.studio?subject=For%20Renzie%20Kyle%20Elarcosa',
  },
  {
    name: 'Ken Baguio',
    role: 'Backend & Database Engineer',
    bio: 'Designs dependable backend systems and data foundations that help products grow.',
    image: kenImage,
    alt: 'Ken Baguio',
    contact: 'mailto:hello@bluenest.studio?subject=For%20Ken%20Baguio',
  },
  {
    name: 'James Ryan Cabiro',
    role: 'Strategy & partnerships',
    bio: 'Builds strong partnerships and helps teams turn shared goals into clear next steps.',
    image: jamesImage,
    alt: 'James Ryan Cabiro',
    contact: 'mailto:hello@bluenest.studio?subject=For%20James%20Ryan%20Cabiro',
  },
  {
    name: 'Neña Rivia B. Debuque',
    role: 'Spokesperson & QA Tester',
    bio: 'Represents the team with a clear voice and tests each experience to help every detail work as intended.',
    image: viaImage,
    alt: 'Via, Blue Nest spokesperson and QA tester',
    contact: 'mailto:hello@bluenest.studio?subject=For%20Via',
  },
]

export const peoplePageStory = {
  promise: {
    kicker: '01 / the promise',
    headline: ['Five people.', 'One standard.'],
    support: 'We shape useful digital experiences with people building something that matters.',
    stats: [
      { value: 5, label: 'team members' },
      { value: 6, label: 'disciplines' },
      { value: 3, label: 'projects shipped' },
    ],
  },
  team: {
    kicker: '02 / the faces',
    headline: 'Meet the people behind the work.',
    support: 'Small team. Real craft. Real people behind every project.',
  },
  proof: {
    kicker: '03 / the proof',
    headline: 'Each one ships.',
    support: 'Different strengths. One team, carrying the work from first thought to final detail.',
  },
  values: {
    kicker: '04 / the way we work',
    headline: 'How we work.',
    values: [
      {
        number: '01',
        title: 'Design and build together.',
        copy: 'Strategy, interface and implementation move in the same room from the start.',
      },
      {
        number: '02',
        title: 'Keep the standard high.',
        copy: 'Every screen is shaped for clarity, speed and ease of use.',
      },
      {
        number: '03',
        title: 'Build for what matters.',
        copy: 'We work toward real outcomes, not noise, extra steps or empty polish.',
      },
    ],
  },
  invite: {
    kicker: '05 / the invitation',
    headline: 'Want to build with us?',
    support: 'A clear idea deserves a clear team.',
    button: 'Start a project',
    ctaHref: 'mailto:hello@bluenest.studio',
  },
}
