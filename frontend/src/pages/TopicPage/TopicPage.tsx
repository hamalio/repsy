import "./TopicPage.scss"
import classNames from "classnames"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import BackButton from "@/components/BackButton/BackButton"
import TopicMark from "@/components/TopicMark/TopicMark"
import NotFound from "@/pages/NotFound/NotFound"
import { ARTICLES } from "@/constants/articles"
import { THEORY } from "@/constants/theory"

function TopicPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (slug !== ARTICLES.slug) {
    return <NotFound />
  }

  const hasTheory = !!THEORY[ARTICLES.slug]

  const blocks = [
    {
      title: t("pages.topic.theory.title"),
      text: t("pages.topic.theory.text"),
      onClick: hasTheory ? () => navigate(`/topics/${ARTICLES.slug}/theory`) : undefined,
    },
    {
      title: t("pages.topic.training.title"),
      text: t("pages.topic.training.text"),
    },
    {
      title: t("pages.topic.check.title"),
      text: t("pages.topic.check.text"),
    },
  ]

  return (
    <main className="topic-page">
      <header className="topic-page__header">
        <TopicMark topic={ARTICLES} className="topic-page__mark" />
        <h1 className="topic-page__title">{ARTICLES.title}</h1>
      </header>

      <div className="topic-page__blocks">
        {blocks.map((block) => (
          <button
            key={block.title}
            type="button"
            className={classNames("topic-page__block", { "topic-page__block--soon": !block.onClick })}
            disabled={!block.onClick}
            onClick={block.onClick}
          >
            <span className="topic-page__block-body">
              <span className="topic-page__block-title">{block.title}</span>
              <span className="topic-page__block-text">{block.text}</span>
            </span>
            <span className="topic-page__block-action">{block.onClick ? "→" : t("pages.topic.soon")}</span>
          </button>
        ))}
      </div>

      <BackButton onClick={() => navigate("/")} />
    </main>
  )
}

export default TopicPage
