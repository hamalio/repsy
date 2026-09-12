import { User } from "@/types/users"
import InfoItem from "../InfoItem/InfoItem"
import "./UserInfoCard.scss"

interface UserInfoCardProps {
    user: User
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
    return (
        <div className="profile">
            <div className="profile__header">
                <h1 className="profile__title">Профіль користувача</h1>
            </div>

            <div className="profile__card">
                <InfoItem
                    icon="🆔"
                    label="ID користувача"
                    value={user.user_id}
                />

                <InfoItem
                    icon="👤"
                    label="Повне ім&apos;я"
                    value={user.full_name}
                />

                <InfoItem
                    icon="@"
                    label="Ім&apos;я користувача"
                    value={user.username ? `@${user.username}` : "Не вказано"}
                />

                <InfoItem
                    icon="🌐"
                    label="Мова"
                    value={`${user.language} (${user.language_code.toUpperCase()})`}
                />
            </div>
        </div>
    )
}

export default UserInfoCard 