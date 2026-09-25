import { ReactNode } from "react"
import "./SectionTitle.scss"

interface SectionTitleProps {
    children: ReactNode
    count?: number
}

/**
 * Small caps heading above a block: "Розминка", "Тиждень", "Програма 6".
 */
const SectionTitle = ({ children, count }: SectionTitleProps) => {
    return (
        <h2 className="section-title">
            {children}
            {count !== undefined && <span className="section-title__count">{count}</span>}
        </h2>
    )
}

export default SectionTitle
