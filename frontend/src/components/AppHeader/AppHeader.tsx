import Logo from "@/assets/images/logo.svg?react"
import { User } from "@/types/users"
import "./AppHeader.scss"

interface AppHeaderProps {
    user?: User
}

const getInitials = (fullName: string) =>
    fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")

const AppHeader = ({ user }: AppHeaderProps) => {
    return (
        <header className="app-header">
            <div className="app-header__logo">
                <Logo className="app-header__mark" />
                <span className="app-header__wordmark">repsy</span>
            </div>

            {user && (
                <div className="app-header__avatar" title={user.full_name}>
                    {getInitials(user.full_name)}
                </div>
            )}
        </header>
    )
}

export default AppHeader
