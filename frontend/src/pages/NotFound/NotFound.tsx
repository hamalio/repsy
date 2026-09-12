import "./NotFound.scss"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/BackButton/BackButton"

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="not-found__card">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">Сторінку не знайдено</h1>
        <p className="not-found__text">Схоже, такої сторінки не існує.</p>
      </div>

      <BackButton onClick={() => navigate("/")} />
    </div>
  )
}

export default NotFound
