import classNames from "classnames"
import { useTranslation } from "react-i18next"
import TopicMark from "@/components/TopicMark/TopicMark"
import { Topic, TopicStatus } from "@/types/topics"
import "./TopicRow.scss"

interface TopicRowProps {
    topic: Topic
    status?: TopicStatus // without it the row has no label on the right
    onClick?: () => void
}

const TopicRow = ({ topic, status, onClick }: TopicRowProps) => {
    const { t } = useTranslation()
    const streak = topic.progress?.repetitions ?? 0

    const getStatusLabel = (status: TopicStatus) => {
        switch (status.kind) {
            case "due":
                return t("common.topicRow.status.due")
            case "new":
                return t("common.topicRow.status.new")
            case "scheduled":
                return status.inDays === 1 ? t("common.topicRow.status.tomorrow") : `за ${status.inDays} дн`
        }
    }

    const renderMeta = () => {
        if (!topic.progress) return t("common.topicRow.meta.notTried")
        if (streak === 0) return t("common.topicRow.meta.lastFailed")

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
