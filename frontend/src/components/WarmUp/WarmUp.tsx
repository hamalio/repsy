import classNames from "classnames"
import { useState } from "react"
import SectionTitle from "@/components/SectionTitle/SectionTitle"
import "./WarmUp.scss"

interface WarmUpQuestion {
    before: string
    after: string
    options: string[]
    answer: string
    explanation: string
}

// TODO: replace with a question from the bank once the API serves one
const DEFAULT_QUESTION: WarmUpQuestion = {
    before: "I saw ",
    after: " elephant at the zoo.",
    options: ["a", "an", "the", "—"],
    answer: "an",
    explanation: "Перед голосним звуком — an.",
}

interface WarmUpProps {
    question?: WarmUpQuestion
}

/**
 * One sentence to warm up right on the home screen. Not graded, does not
 * touch SM-2 tap until it is right.
 */
const WarmUp = ({ question = DEFAULT_QUESTION }: WarmUpProps) => {
    const [picked, setPicked] = useState<string | null>(null)
    const isCorrect = picked === question.answer

    return (
        <div className="warm-up">
            <SectionTitle>Розминка</SectionTitle>

            <p className="warm-up__sentence">
                {question.before}
                <span
                    className={classNames("warm-up__gap", {
                        "warm-up__gap--correct": picked && isCorrect,
                        "warm-up__gap--wrong": picked && !isCorrect,
                    })}
                >
                    {picked ?? " "}
                </span>
                {question.after}
            </p>

            <div className="warm-up__options">
                {question.options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        className={classNames("warm-up__option", {
                            "warm-up__option--picked": option === picked,
                        })}
                        disabled={isCorrect}
                        onClick={() => setPicked(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <p className="warm-up__hint">
                {!picked && "Одне речення, без оцінок"}
                {picked && isCorrect && `Зараховано. ${question.explanation}`}
                {picked && !isCorrect && "Не те. Спробуй інший варіант"}
            </p>
        </div>
    )
}

export default WarmUp
