import { en, type Dict } from './en';
import { fa } from './fa';

export type { Dict };

export type Locale = 'en' | 'fa';
export const locales: readonly Locale[] = ['en', 'fa'];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Dict> = { en, fa };

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'fa';
}

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export function langAttr(locale: Locale): string {
  return locale;
}

export function dirAttr(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'fa' ? 'rtl' : 'ltr';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fa' : 'en';
}

export function localePath(locale: Locale, path = '/'): string {
  return locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
}

export function isCurrentLocale(locale: Locale, target: string): boolean {
  return locale === target;
}
