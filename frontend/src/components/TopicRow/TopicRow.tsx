import classNames from "classnames"
import TopicMark from "@/components/TopicMark/TopicMark"
import { Topic, TopicStatus } from "@/types/topics"
import "./TopicRow.scss"

interface TopicRowProps {
    topic: Topic
    status?: TopicStatus // without it the row has no label on the right
    onClick?: () => void
}

const getStatusLabel = (status: TopicStatus) => {
    switch (status.kind) {
        case "due":
            return "Сьогодні"
        case "new":
            return "Нова"
        case "scheduled":
            return status.inDays === 1 ? "Завтра" : `за ${status.inDays} дн`
    }
}

const TopicRow = ({ topic, status, onClick }: TopicRowProps) => {
    const streak = topic.progress?.repetitions ?? 0

    const renderMeta = () => {
        if (!topic.progress) return "Ще не пробували"
        if (streak === 0) return "Минулий підхід не зараховано"

        return `${streak} підходи поспіль`
    }

    return (
        <button
            type="button"
            className={classNames("topic-row", status && `topic-row--${status.kind}`)}
            onClick={onClick}
        >
            <TopicMark topic={topic} className="topic-row__mark" />

            <span className="topic-row__body">
                <span className="topic-row__title">{topic.title}</span>
                <span className="topic-row__meta">{renderMeta()}</span>
            </span>

            {status && <span className="topic-row__status">{getStatusLabel(status)}</span>}
        </button>
    )
}

export default TopicRow
