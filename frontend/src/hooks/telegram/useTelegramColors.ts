import { useEffect } from "react"
import { TELEGRAM_BG_COLOR } from "@/constants/theme"

/**
 * Paints the Telegram WebApp header and bottom area with the app background.
 *
 * The bar below the app is painted via setBottomBarColor (Bot API 7.10+), which
 * does not work reliably in Telegram Desktop for macOS — there it falls back to
 * the app background color. So we also call setBackgroundColor (Bot API 6.1+,
 * supported everywhere).
 */
export const useTelegramColors = () => {
    useEffect(() => {
        const webApp = window.Telegram?.WebApp
        if (!webApp) return

        webApp.setHeaderColor?.(TELEGRAM_BG_COLOR)
        webApp.setBackgroundColor?.(TELEGRAM_BG_COLOR)
        webApp.setBottomBarColor?.(TELEGRAM_BG_COLOR)
    }, [])
}

export default useTelegramColors
