import { useEffect } from "react"
import { showBackButton } from "@/utils/telegram"

interface BackButtonProps {
    onClick: () => void
}

const BackButton = ({ onClick }: BackButtonProps) => {
    // Show the native Telegram back button while this component is mounted
    useEffect(() => showBackButton(onClick), [onClick])

    return null
}

export default BackButton
