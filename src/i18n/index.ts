import { en, type Dict } from './en';

export type { Dict };

export type Locale = 'en';
export const locales: readonly Locale[] = ['en'];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Dict> = { en };

export function isLocale(value: string): value is Locale {
  return value === 'en';
}

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export function langAttr(locale: Locale): string {
  return locale;
}

export function dirAttr(_locale: Locale): 'ltr' | 'rtl' {
  return 'ltr';
}

export function otherLocale(_locale: Locale): Locale {
  return 'en';
}

export function localePath(locale: Locale, path = '/'): string {
  return locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
}

export function isCurrentLocale(locale: Locale, target: string): boolean {
  return locale === target;
}
