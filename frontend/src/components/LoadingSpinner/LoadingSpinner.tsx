import "./LoadingSpinner.scss"

interface LoadingSpinnerProps {
    message?: string
}

const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
    return (
        <div className="loader">
            <div className="loader__spinner"></div>
            {message && <p className="loader__message">{message}</p>}
        </div>
    )
}

export default LoadingSpinner
