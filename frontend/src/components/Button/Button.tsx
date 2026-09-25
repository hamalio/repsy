import classNames from "classnames"
import { ReactNode } from "react"
import "./Button.scss"

interface ButtonProps {
    children: ReactNode
    variant?: "primary" | "link"
    onClick?: () => void
}

const Button = ({ children, variant = "primary", onClick }: ButtonProps) => {
    return (
        <button
            type="button"
            className={classNames("button", `button--${variant}`)}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
