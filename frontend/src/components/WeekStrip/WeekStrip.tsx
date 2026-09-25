import classNames from "classnames"
import SectionTitle from "@/components/SectionTitle/SectionTitle"
import { startOfWeek, toDayKey } from "@/utils/dates"
import "./WeekStrip.scss"

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

interface WeekStripProps {
    now: Date
}

/**
 * The current week, Monday to Sunday.
 */
const WeekStrip = ({ now }: WeekStripProps) => {
    const monday = startOfWeek(now)
    const today = toDayKey(now)

    return (
        <div className="week-strip">
            <SectionTitle>Тиждень</SectionTitle>

            <ol className="week-strip__days">
                {WEEKDAYS.map((weekday, offset) => {
                    const day = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + offset)
                    const key = toDayKey(day)

                    return (
                        <li
                            key={key}
                            className={classNames("week-strip__day", {
                                "week-strip__day--today": key === today,
                                "week-strip__day--future": key > today,
                            })}
                        >
                            <span className="week-strip__weekday">{weekday}</span>
                            <span className="week-strip__date">{day.getDate()}</span>
                            {/* TODO: only days with a set or warm-up, once the activity log exists */}
                            <span className={classNames("week-strip__mark", { "week-strip__mark--done": key < today })} />
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default WeekStrip
