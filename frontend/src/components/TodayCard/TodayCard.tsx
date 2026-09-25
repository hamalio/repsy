import Button from "@/components/Button/Button"
import { Topic } from "@/types/topics"
import "./TodayCard.scss"

interface TodayCardProps {
    focus:
        | { kind: "due", topic: Topic, overdueDays: number, queued: number }
        | { kind: "rest", nextTopic?: Topic, inDays?: number }
}

const TodayCard = ({ focus }: TodayCardProps) => {
    if (focus.kind === "rest") {
        return (
            <section className="today-card today-card--rest">
                <p className="today-card__eyebrow">Сьогодні без підходів</p>
                <h2 className="today-card__title">Ти попереду</h2>
                
                <div className="today-card__actions">
                    <Button variant="link">Вільна розминка</Button>
                </div>
            </section>
        )
    }

    return (
        <section className="today-card today-card--due">
            <p className="today-card__eyebrow">Підхід · 10 повторень</p>
            <h2 className="today-card__title">{focus.topic.title}</h2>

            <p className="today-card__meta">
                {focus.overdueDays > 0
                    ? `Чекає вже 1 день`
                    : "Саме час, поки не забулось"}
            </p>

            <div className="today-card__actions">
                <Button>Почати підхід</Button>
                <Button variant="link">або спершу розминка</Button>
            </div>
        </section>
    )
}

export default TodayCard
