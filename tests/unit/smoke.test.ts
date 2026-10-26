import { describe, expect, it } from 'vitest';
import { isLocale, localePath } from '~/i18n';

describe('i18n helpers', () => {
  it('recognises only known locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('xx')).toBe(false);
  });

  it('builds locale paths', () => {
    expect(localePath('en', '/')).toBe('/');
    expect(localePath('en', '/x')).toBe('/x');
  });
});
