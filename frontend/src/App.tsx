import "./App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "@/pages/NotFound/NotFound"
import Home from "@/pages/Home/Home"
import TopicPage from "@/pages/TopicPage/TopicPage"
import TheoryPage from "@/pages/TheoryPage/TheoryPage"
import WelcomePage from "@/pages/WelcomePage/WelcomePage"
import { useState } from "react"
import { useTelegramColors } from "@/hooks/telegram/useTelegramColors"

function detectTelegramWebApp(): boolean {
  return !!window.Telegram?.WebApp?.initData
}

function App() {
  const [isTelegramWebApp] = useState(detectTelegramWebApp)

  useTelegramColors()

  if (!isTelegramWebApp) {
    return <WelcomePage />
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
