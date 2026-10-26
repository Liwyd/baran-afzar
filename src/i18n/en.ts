export const en = {
  meta: {
    title: 'Baran Afzar — Software engineering team',
    description:
      'Baran Afzar is a two-person software engineering team. We design, build and maintain software systems, from infrastructure to interface.',
  },
  nav: {
    approach: 'Approach',
    capabilities: 'Capabilities',
    people: 'People',
  },
  hero: {
    eyebrowNum: '00',
    eyebrowLabel: 'Software Engineering Collective',
    headline: ['Small team.', 'Sound engineering.'],
    sub: 'From infrastructure to interface, we build software with care.',
    cta: 'Meet the engineers',
    intro:
      'Baran Afzar is a small software engineering team founded by Ali Karimi and Amir Taha Javadi.',
  },
  approach: {
    label: 'Approach',
    items: [
      { n: '01', title: 'Understand', desc: 'The problem before the solution' },
      { n: '02', title: 'Build', desc: 'With deliberate decisions' },
      { n: '03', title: 'Refine', desc: 'As the software evolves' },
    ],
  },
  capabilities: {
    num: '01',
    label: 'Capabilities',
    headline: ['Our engineering', 'focus.'],
    body: 'Clear decisions, at every layer of the software.',
    rows: [
      {
        n: '01',
        title: 'Software development',
        desc: 'Turning a defined problem into useful, maintainable software.',
      },
      {
        n: '02',
        title: 'System design',
        desc: 'Defining clear boundaries, interfaces, and the trade-offs behind them.',
      },
      {
        n: '03',
        title: 'Quality & evolution',
        desc: 'Reviewing, testing, and improving code as needs change.',
      },
    ],
  },
  people: {
    num: '02',
    label: 'People',
    headline: ['Two engineers.', 'One shared practice.'],
    role: 'Co-founder',
    links: { profile: 'Profile', resume: 'Résumé' },
    disclosure: 'Show details',
    note: 'Individual profile and résumé links will be added soon.',
  },
  contact: {
    num: '03',
    label: 'Contact',
    heading: 'Start a conversation.',
    pending: 'Direct contact details will be published soon.',
  },
  quote: {
    text: '“We try to create teams that are no larger than can be fed by two pizzas.”',
    author: 'Jeff Bezos',
  },
  footer: {
    tagline: 'An independent software engineering team.',
    backToTop: 'Back to top',
    lang: { en: 'EN', fa: 'فارسی' },
  },
} as const;

export type Dict = typeof en;
