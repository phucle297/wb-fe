import { useTranslation } from "react-i18next";

export const useLocale = (namespace: Parameters<typeof useTranslation>[0] = "ko") => {
  const { i18n } = useTranslation(namespace);
  const isLocaleReady = Object.keys(i18n).length > 0;

  return {
    i18n,
    t: i18n.t,
    isLocaleReady,
  };
};
