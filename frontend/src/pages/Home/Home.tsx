import "./Home.scss"
import { useNavigate } from "react-router-dom"
import AppHeader from "@/components/AppHeader/AppHeader"
import TopicRow from "@/components/TopicRow/TopicRow"
import SectionTitle from "@/components/SectionTitle/SectionTitle"
import { ARTICLES } from "@/constants/articles"
import { useCurrentUserQuery } from "@/hooks/useCurrentUserQuery"
import { getTelegramUserData } from "@/utils/telegram"
import { Topic } from "@/types/topics"

// TODO: take the topics from the API
const TOPICS: Topic[] = [ARTICLES]

function Home() {
  const navigate = useNavigate()
  const { initData } = getTelegramUserData()
  const { data: user } = useCurrentUserQuery(initData)

  const renderContent = () => {
    const firstName = user?.full_name.split(" ")[0]

    return (
      <>
        <section className="home__intro">
          {firstName && <p className="home__greeting">Привіт, {firstName}!</p>}
          {/*<h1 className="home__headline">
            {focus.kind === "due" && (
              <>
                Сьогодні <span className="home__count">{focus.queued + 1}</span> підходи
              </>
            )}
            {focus.kind === "rest" && <>Сьогодні вихідний</>}
          </h1> */}
        </section>

        {/*<TodayCard focus={focus} /> */}

         {/*<WarmUp /> */}

         {/*<WeekStrip now={now} /> */}

        <section>
          <SectionTitle count={TOPICS.length}>Програма</SectionTitle>

          <div className="home__topics">
            {TOPICS.map((topic) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                onClick={() => navigate(`/topics/${topic.slug}`)}
              />
            ))}
          </div>
        </section>
      </>
    )
  }

  return (
    <main className="home">
      <AppHeader user={user} />
      {renderContent()}
    </main>
  )
}

export default Home
