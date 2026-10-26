export type Locale = 'en' | 'fa';

export interface Localized {
  en: string;
  fa: string;
}

export interface Member {
  slug: string;
  label: Localized;
  initials: string;
  name: Localized;
  /** Script-native (Persian) rendering of the name, shown under the Latin name. */
  nameNative: string;
  title: Localized;
  bio?: Localized;
  profileUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  resumeUrl?: string | null;
}
