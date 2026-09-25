import "./TheoryPage.scss"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "@/components/BackButton/BackButton"
import TopicMark from "@/components/TopicMark/TopicMark"
import NotFound from "@/pages/NotFound/NotFound"
import { ARTICLES } from "@/constants/articles"
import { THEORY } from "@/constants/theory"

// "I saw [an] elephant." - the bracketed article is highlighted
const renderExample = (example: string) =>
  example.split(/\[(.+?)\]/).map((part, i) =>
    i % 2 === 1 ? <mark key={i} className="theory-page__article">{part}</mark> : part
  )

function TheoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const theory = THEORY[ARTICLES.slug]
  if (slug !== ARTICLES.slug || !theory) {
    return <NotFound />
  }

  return (
    <main className="theory-page">
      <header className="theory-page__header">
        <p className="theory-page__eyebrow">
          <TopicMark topic={ARTICLES} className="theory-page__mark" />
          Теорія
        </p>
        <h1 className="theory-page__title">{ARTICLES.title}</h1>
        <p className="theory-page__intro">{theory.intro}</p>
      </header>

      {theory.sections.map((section) => (
        <section key={section.title} className="theory-page__section">
          <h2 className="theory-page__section-title">{section.title}</h2>
          <p className="theory-page__text">{section.text}</p>

          <ul className="theory-page__examples">
            {section.examples.map((example) => (
              <li key={example} className="theory-page__example">{renderExample(example)}</li>
            ))}
          </ul>
        </section>
      ))}

      <section className="theory-page__section">
        <h2 className="theory-page__section-title">Як обрати</h2>

        <ol className="theory-page__steps">
          {theory.steps.map((step, i) => (
            <li key={step} className="theory-page__step">
              <span className="theory-page__step-count">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <BackButton onClick={() => navigate(`/topics/${ARTICLES.slug}`)} />
    </main>
  )
}

export default TheoryPage
