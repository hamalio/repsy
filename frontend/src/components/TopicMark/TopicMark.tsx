import classNames from "classnames"
import { TOPIC_MARKS } from "@/constants/topicMarks"
import { Topic } from "@/types/topics"
import "./TopicMark.scss"

interface TopicMarkProps {
    topic: Topic
    className?: string
}

/**
 * The topic's own logo: "-s" with the dash dimmed, so the grammar part stands out.
 * Topics without a mark fall back to their position number.
 */
const TopicMark = ({ topic, className }: TopicMarkProps) => {
    const mark = TOPIC_MARKS[topic.slug] ?? String(topic.position).padStart(2, "0")

    return (
        <span className={classNames("topic-mark", className)}>
            {mark.split(/([-/])/).filter(Boolean).map((part, i) => (
                <span key={i} className={classNames({ "topic-mark__joint": part === "-" || part === "/" })}>
                    {part}
                </span>
            ))}
        </span>
    )
}

export default TopicMark
