import "./WelcomePage.scss"

function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="welcome-page__card">
        <div className="welcome-page__emoji">👋</div>
        <h1 className="welcome-page__title">Вітаємо!</h1>
        <p className="welcome-page__text">
          Цей застосунок працює всередині Telegram. Щоб продовжити, відкрийте його
          через нашого бота в Telegram.
        </p>
      </div>
    </div>
  )
}

export default WelcomePage
