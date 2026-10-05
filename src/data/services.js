export const servicesPage = {
  metaDescription:
    'Explore Blue Nest services: web development, virtual assistant support, and English language teaching.',
  hero: {
    eyebrow: 'Ways we can help',
    headline: [
      { text: 'One team.' },
      { text: 'Three ways we' },
      { text: 'help you grow.', accent: true },
    ],
    support: 'Practical digital, operational and language support, shaped around your needs.',
    linksLabel: 'Jump to a service',
    tags: ['WEB', 'OPERATIONS', 'LANGUAGE'],
    links: [
      { label: 'Web', href: '#web-development' },
      { label: 'Virtual Assistant', href: '#virtual-assistant' },
      { label: 'ESL', href: '#english-language' },
    ],
    scrollCue: 'Find your starting point',
  },
  bridge: {
    eyebrow: 'Start with what needs to move',
    headline: 'A clearer website. A lighter workload. Stronger English.',
    support:
      'Different challenges call for different kinds of help. Choose the one that would make the biggest difference now.',
  },
  overview: {
    eyebrow: 'Three ways to begin',
    headline: 'Choose where to begin.',
    services: [
      {
        id: 'web-development',
        shortTitle: 'Web Development',
        icon: 'web',
        promise: 'Websites and systems that work for your business.',
        learnMore: 'Learn more',
      },
      {
        id: 'virtual-assistant',
        shortTitle: 'Virtual Assistant',
        icon: 'assistant',
        promise: 'Remote admin and operational support you can count on.',
        learnMore: 'Learn more',
      },
      {
        id: 'english-language',
        shortTitle: 'English Language Support',
        icon: 'language',
        promise: 'English teaching and language support, made practical.',
        learnMore: 'Learn more',
      },
    ],
  },
  details: [
    {
      id: 'web-development',
      type: 'web',
      eyebrow: '01 / Web development',
      title: 'Websites and systems, made for real work.',
      visualLabel: 'A browser window with a website layout taking shape',
      visualContent: {},
      description:
        'We build and customize webpages and web systems, from focused landing pages to business sites, dashboards and portals.',
      examples: [
        'Landing pages',
        'Business sites',
        'Custom systems and portals',
        'Redesign and customization',
      ],
      examplesLabel: 'Web development examples',
      deliverablesLabel: 'What you get',
      deliverables: [
        'TODO: replace — Site structure and page templates',
        'TODO: replace — Responsive interface and visual details',
        'TODO: replace — Custom functionality or integrations',
        'TODO: replace — Testing and launch handoff',
      ],
      bestFor: 'Teams that need a new website, a clearer redesign, or a custom web tool.',
      cta: 'Discuss a web project',
      bestForLabel: 'Best for',
    },
    {
      id: 'virtual-assistant',
      type: 'assistant',
      eyebrow: '02 / Virtual assistant',
      title: 'Steady support for the work behind the scenes.',
      visualLabel: 'An organized task list beside a monthly calendar',
      visualContent: { taskHeading: 'Today’s list', calendarHeading: 'THIS MONTH' },
      description:
        'Remote administrative and operational support helps keep everyday tasks organized and moving.',
      examples: [
        'TODO: replace — Inbox and calendar coordination',
        'TODO: replace — Meeting and document support',
      ],
      examplesLabel: 'Virtual assistant examples',
      deliverablesLabel: 'What you get',
      deliverables: [
        'TODO: replace — Inbox and calendar coordination',
        'TODO: replace — Document and information organization',
        'TODO: replace — Routine administrative follow-through',
        'TODO: replace — Operations support based on agreed priorities',
      ],
      bestFor: 'Busy people and teams who need dependable remote admin support.',
      cta: 'Discuss support',
      bestForLabel: 'Best for',
    },
    {
      id: 'english-language',
      type: 'language',
      eyebrow: '03 / ESL',
      title: 'English support for clearer communication.',
      visualLabel: 'Two speech bubbles showing a simple English exchange',
      visualContent: {
        practiceLabel: 'PRACTICE',
        replyLabel: 'REPLY',
        phrases: ['Good morning.', 'How can I help?'],
      },
      description:
        'English teaching and language support focused on practical communication and the learner’s goals.',
      examples: [
        'TODO: replace — Everyday conversation practice',
        'TODO: replace — Work or study English support',
      ],
      examplesLabel: 'English language support examples',
      deliverablesLabel: 'What you get',
      deliverables: [
        'TODO: replace — Lessons matched to learner goals',
        'TODO: replace — Guided speaking and listening practice',
        'TODO: replace — Vocabulary and grammar support',
        'TODO: replace — Feedback and suggested next steps',
      ],
      bestFor: 'Learners who want structured English lessons and language practice.',
      cta: 'Discuss English lessons',
      bestForLabel: 'Best for',
    },
  ],
  stickyNavLabel: 'Services on this page',
  stickyNavTitle: 'Services',
  visualCaption: 'BLUE NEST',
  process: {
    eyebrow: 'How we work',
    headline: 'Then we move forward together.',
    support: 'One simple rhythm, shaped around the work.',
    steps: [
      { title: 'Discover', line: 'TODO: replace — Share the goal, context and constraints.' },
      { title: 'Plan', line: 'TODO: replace — Agree on scope, priorities and next steps.' },
      { title: 'Deliver', line: 'TODO: replace — Do the work and review it together.' },
      { title: 'Support', line: 'TODO: replace — Confirm handoff and any ongoing support.' },
    ],
  },
  faq: {
    eyebrow: 'Questions, answered',
    headline: 'Questions before we begin.',
    items: [
      {
        question: 'Can I ask for more than one service?',
        answer:
          'Yes. Tell us what you need and we can discuss whether one service or a combination is the right fit.',
      },
      {
        question: 'How do you decide the scope?',
        answer:
          'We start with your goals and priorities, then agree on a suitable scope before work begins.',
      },
      {
        question: 'Can you work with an existing website or workflow?',
        answer:
          'For web work, we can discuss a new build or changes to an existing site. For other support, share the tools and workflow you use.',
      },
      {
        question: 'How do remote projects work?',
        answer:
          'We coordinate remotely and agree on communication, review points and deliverables as part of planning.',
      },
      {
        question: 'What should I include in my first message?',
        answer:
          'A short description of what you need, what outcome you want, and any timing or requirements you already know is a good start.',
      },
    ],
  },
  invite: {
    eyebrow: 'Start a conversation',
    headline: 'Tell us what you need.',
    support: 'We will help you find the right next step.',
    button: 'Talk to the team',
    href: '/contact#contact',
  },
}

export const servicesTiming = {
  duration: 0.75,
  stagger: 0.08,
  rise: 24,
  revealStart: 'top 85%',
  ease: 'power3.out',
  stickyOffset: 118,
  visualAssembly: 0.5,
  checklistDraw: 0.45,
  phraseReveal: 0.55,
  processDraw: 0.8,
  faqOpen: 0.35,
  faqClose: 0.3,
  sectionStagger: 0.12,
  visualParallax: 4,
}
