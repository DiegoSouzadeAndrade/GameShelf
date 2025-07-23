import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'
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
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
