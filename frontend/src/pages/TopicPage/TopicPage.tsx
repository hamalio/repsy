import "./TopicPage.scss"
import classNames from "classnames"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "@/components/BackButton/BackButton"
import TopicMark from "@/components/TopicMark/TopicMark"
import NotFound from "@/pages/NotFound/NotFound"
import { ARTICLES } from "@/constants/articles"
import { THEORY } from "@/constants/theory"

function TopicPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  if (slug !== ARTICLES.slug) {
    return <NotFound />
  }

  const hasTheory = !!THEORY[ARTICLES.slug]

  const blocks = [
    {
      title: "Теорія",
      text: "Правила й приклади",
      onClick: hasTheory ? () => navigate(`/topics/${ARTICLES.slug}/theory`) : undefined,
    },
    {
      title: "Тренування",
      text: "Без оцінок, пояснення одразу",
    },
    {
      title: "Перевірка",
      text: "10 повторень, пояснення в кінці",
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
            <span className="topic-page__block-action">{block.onClick ? "→" : "скоро"}</span>
          </button>
        ))}
      </div>

      <BackButton onClick={() => navigate("/")} />
    </main>
  )
}

export default TopicPage
