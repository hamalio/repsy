import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import uk from "@/locales/uk"
import en from "@/locales/en"

const resources = {
  uk: { translation: uk },
  en: { translation: en },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uk",          // initial language until the user is loaded from the backend
    fallbackLng: "uk",  // used when a key is missing in the current language
    interpolation: {
      escapeValue: false, // React already escapes values (XSS)
    },
  })

export default i18n
