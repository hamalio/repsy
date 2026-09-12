import "./App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "@/pages/NotFound/NotFound"
import UserProfile from "@/pages/UserProfile/UserProfile"
import WelcomePage from "@/pages/WelcomePage/WelcomePage"
import { useState } from "react"
import { useTelegramHeader } from "@/hooks/telegram/useTelegramHeader"
import { useTelegramBottomBar } from "@/hooks/telegram/useTelegramBottomBar"

function detectTelegramWebApp(): boolean {
  return !!window.Telegram?.WebApp?.initData
}

function App() {
  const [isTelegramWebApp] = useState(detectTelegramWebApp)

  useTelegramHeader()
  useTelegramBottomBar()

  if (!isTelegramWebApp) {
    return <WelcomePage />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserProfile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
