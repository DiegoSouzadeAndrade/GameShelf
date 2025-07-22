import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './translations/en.json';
import pt from './translations/pt.json';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

const fallbackLng = 'en';

const { languageTag } = RNLocalize.findBestLanguageTag(Object.keys(resources)) || { 
    languageTag: fallbackLng };

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageTag,
    fallbackLng,
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
