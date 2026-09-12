import { useEffect } from 'react'

const HEADER_COLOR = '#0f172a'

/**
 * Sets the Telegram WebApp header color.
 */
export const useTelegramHeader = () => {
  useEffect(() => {
    window.Telegram?.WebApp?.setHeaderColor(HEADER_COLOR)
  }, [])
}

export default useTelegramHeader
