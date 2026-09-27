import "./NotFound.scss"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import BackButton from "@/components/BackButton/BackButton"

function NotFound() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="not-found">
      <div className="not-found__card">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">{t("pages.notFound.title")}</h1>
        <p className="not-found__text">{t("pages.notFound.text")}</p>
      </div>

      <BackButton onClick={() => navigate("/")} />
    </div>
  )
}

export default NotFound
