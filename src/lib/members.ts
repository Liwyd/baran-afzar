import type { Member } from './types';

/**
 * Design seed. `profileUrl`, `linkedinUrl`, `githubUrl`, `bio` and `resumeUrl`
 * are intentionally empty: they are per-person facts that must be supplied
 * through the admin dashboard (M5), never invented here. While they are empty
 * the card renders the "links added soon" note and hides the disclosure.
 */
export const seedMembers: Member[] = [
  {
    slug: 'ali-karimi',
    label: { en: 'Co-founder', fa: 'بنیان‌گذار' },
    initials: 'A. K.',
    name: { en: 'Ali Karimi', fa: 'Ali Karimi' },
    nameNative: 'علی کریمی',
    title: {
      en: 'Software Engineer — Backend & DevOps',
      fa: 'مهندس نرم‌افزار — بک‌اند و دواپس',
    },
    bio: undefined,
    profileUrl: null,
    linkedinUrl: null,
    githubUrl: null,
    resumeUrl: null,
  },
  {
    slug: 'amir-taha-javadi',
    label: { en: 'Co-founder', fa: 'بنیان‌گذار' },
    initials: 'A. T. J.',
    name: { en: 'Amir Taha Javadi', fa: 'Amir Taha Javadi' },
    nameNative: 'امیر طها جوادی',
    title: {
      en: 'Software Engineer — Frontend',
      fa: 'مهندس نرم‌افزار — فرانت‌اند',
    },
    bio: undefined,
    profileUrl: null,
    linkedinUrl: null,
    githubUrl: null,
    resumeUrl: null,
  },
];
