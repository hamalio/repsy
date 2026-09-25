import { ReactNode } from "react"
import "./PageState.scss"

interface PageStateProps {
    children: ReactNode
}

/**
 * Whole-screen state — loading or error. Takes the height left by the header
 * and puts its content in the middle, so a short card is not stuck to the top.
 */
const PageState = ({ children }: PageStateProps) => {
    return <div className="page-state">{children}</div>
}

export default PageState
