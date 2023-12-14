import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { TTranslationKeys } from "@/types/translation";

import en from "./en.json";
import vi from "./vi.json";

const resources = {
  en: { translation: { ...en } },
  vi: { translation: { ...vi } },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export type AvailableLanguages = keyof typeof resources;
export type Translations = (typeof resources)[AvailableLanguages]["translation"];

// Helper function for auto-suggestions
export const getKeysAutoSuggestTranslations = () => {
  const keysTrans = Object.keys(en) as (keyof TTranslationKeys)[];
  const objKeysTrans: TTranslationKeys = {} as TTranslationKeys;
  keysTrans.forEach((key: keyof TTranslationKeys) => {
    objKeysTrans[key] = key;
  });

  return objKeysTrans;
};

export const keysTrans = getKeysAutoSuggestTranslations();

export default i18n;
