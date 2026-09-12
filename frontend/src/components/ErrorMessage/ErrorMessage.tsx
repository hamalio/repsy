import "./ErrorMessage.scss"

interface ErrorMessageProps {
    icon?: string
    title: string
    message: string
}

const ErrorMessage = ({ icon = "⚠️", title, message }: ErrorMessageProps) => {
    return (
        <div className="error-message">
            <div className="error-message__icon">{icon}</div>
            <h2 className="error-message__title">{title}</h2>
            <p className="error-message__text">{message}</p>
        </div>
    )
}

export default ErrorMessage
