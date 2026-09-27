import "./App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "@/pages/NotFound/NotFound"
import Home from "@/pages/Home/Home"
import TopicPage from "@/pages/TopicPage/TopicPage"
import TheoryPage from "@/pages/TheoryPage/TheoryPage"
import WelcomePage from "@/pages/WelcomePage/WelcomePage"
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner"
import LanguageSelection from "@/components/LanguageSelection/LanguageSelection"
import { useState } from "react"
import { useTelegramColors } from "@/hooks/telegram/useTelegramColors"
import { useRegisterUserQuery } from "@/hooks/useRegisterUserQuery"
import { useSyncLanguage } from "@/hooks/useSyncLanguage"
import { getTelegramUserData } from "@/utils/telegram"

function detectTelegramWebApp(): boolean {
  return !!window.Telegram?.WebApp?.initData
}

function App() {
  const [isTelegramWebApp] = useState(detectTelegramWebApp)
  const { initData } = getTelegramUserData()
  const { data: registration, isLoading } = useRegisterUserQuery(initData)

  useTelegramColors()
  useSyncLanguage(registration?.language_code)

  if (!isTelegramWebApp) {
    return <WelcomePage />
  }

  // Wait for the user so the first screen is already in their language
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (registration && registration.language_code === null) {
    return <LanguageSelection />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/:slug" element={<TopicPage />} />
        <Route path="/topics/:slug/theory" element={<TheoryPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
