export const getTelegramUserData = () => {
    const telegram = window.Telegram?.WebApp

    return {
        userId: telegram?.initDataUnsafe?.user?.id,
        initData: telegram?.initData
    }
}

/**
 * Shows the native Telegram back button and wires up its click handler.
 * Returns a cleanup function (unregister handler + hide) for useEffect.
 */
export const showBackButton = (onClick: () => void) => {
    const backButton = window.Telegram?.WebApp?.BackButton

    if (!backButton) return

    backButton.onClick(onClick)
    backButton.show()

    return () => {
        backButton.offClick(onClick)
        backButton.hide()
    }
}