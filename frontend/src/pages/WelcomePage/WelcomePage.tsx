import "./WelcomePage.scss"
import Logo from "@/assets/images/logo.svg?react"

function WelcomePage() {
  return (
    <div className="welcome-page">
      <p className="welcome-page__logo">
        <Logo className="welcome-page__logo-mark" />
        repsy
      </p>

      <h1 className="welcome-page__title">Щоб не забувати вивчене</h1>
      <p className="welcome-page__text">
        Короткі підходи й нагадування в потрібний час.
      </p>

      <p className="welcome-page__note">Відкрий Repsy через бота в Telegram</p>
    </div>
  )
}

export default WelcomePage
