import { useCurrentUserQuery } from "@/hooks/useCurrentUserQuery"
import { getTelegramUserData } from "@/utils/telegram"
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner"
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage"
import UserInfoCard from "@/components/UserInfoCard/UserInfoCard"
import "./UserProfile.scss"

const UserProfile = () => {
    const { initData } = getTelegramUserData()
    const { data: user, isLoading, error } = useCurrentUserQuery(initData)

    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner message="Завантаження даних користувача..." />
        }

        if (error || !user) {
            return (
                <ErrorMessage
                    icon={error ? "⚠️" : "👤"}
                    title={error ? "Помилка завантаження" : "Користувач не знайдений"}
                    message={error ? "Не вдалося завантажити дані користувача" : "Дані користувача відсутні"}
                />
            )
        }

        return <UserInfoCard user={user} />
    }

    return <div className="user-profile">{renderContent()}</div>
}

export default UserProfile
