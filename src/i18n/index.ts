import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import tr from './locales/tr.json';

export const supportedLanguages = ['en', 'tr'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const supportedLanguageSet = new Set<string>(supportedLanguages);

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return supportedLanguageSet.has(value);
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    fallbackLng: 'en',
    supportedLngs: [...supportedLanguages],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

type TranslateOptions = Record<string, unknown>;

export const translate = (key: string, options?: TranslateOptions): string =>
  (i18n.t as (translationKey: string, translationOptions?: TranslateOptions) => string)(
    key,
    options
  );

export default i18n;
