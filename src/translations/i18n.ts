import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import translations from './translations.json';

const resources = translations;

const locales = RNLocalize.getLocales();
const languageTag = locales[0]?.languageCode || 'en';

const initI18n = () => {
  if (!i18n.isInitialized) {
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: languageTag,
        fallbackLng: 'en',
        interpolation: { 
          escapeValue: false 
        },
        react: {
          useSuspense: false,
        },
        initImmediate: true,
      });
  }
};

initI18n();

export default i18n;