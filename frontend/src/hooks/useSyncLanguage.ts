import { useLayoutEffect } from "react"
import i18n from "@/i18n"


export const useSyncLanguage = (languageCode: string | null | undefined) => {
    // Layout effect runs before paint, so the first screen is not flashed in the default language
    useLayoutEffect(() => {
        if (languageCode) {
            i18n.changeLanguage(languageCode)
        }
    }, [languageCode])
}
