import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation JSON files
import translationEn from './locales/en/translation.json';
import translationAr from './locales/ar/translation.json';

const resources = {
  en: { translation: translationEn },
  ar: { translation: translationAr },
};

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
