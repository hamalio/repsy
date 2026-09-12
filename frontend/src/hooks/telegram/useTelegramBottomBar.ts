import { useEffect } from 'react'

const BOTTOM_BAR_COLOR = '#0f172a'

/**
 * Syncs the color of the Telegram WebApp bottom area with the app.
 *
 * The bar below the app is painted via setBottomBarColor (Bot API 7.10+), which
 * does not work reliably in Telegram Desktop for macOS — there it falls back to
 * the app background color. So we also call setBackgroundColor (Bot API 6.1+,
 * supported everywhere).
 */
export const useTelegramBottomBar = () => {
  useEffect(() => {
    const webApp = window.Telegram?.WebApp
    if (!webApp) return

    if (webApp.setBackgroundColor) {
      webApp.setBackgroundColor(BOTTOM_BAR_COLOR)
    }
    if (webApp.setBottomBarColor) {
      webApp.setBottomBarColor(BOTTOM_BAR_COLOR)
    }
  }, [])
}

export default useTelegramBottomBar
