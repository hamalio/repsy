import "./LanguageSelection.scss"
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner"
import { useLanguagesQuery } from "@/hooks/useLanguagesQuery"
import { useSetLanguageMutation } from "@/hooks/useSetLanguageMutation"
import { getTelegramUserData } from "@/utils/telegram"

/**
 * Shown on the first Mini App open when the Telegram language is not one we support.
 */
const LanguageSelection = () => {
    const { initData } = getTelegramUserData()
    const { data: languages, isLoading } = useLanguagesQuery(initData)
    const { mutate: setLanguage, isPending } = useSetLanguageMutation(initData)

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="language-selection">
            <h1 className="language-selection__title">Оберіть мову</h1>
            <p className="language-selection__subtitle">Choose a language</p>

            <div className="language-selection__list">
                {languages?.map((language) => (
                    <button
                        key={language.code}
                        type="button"
                        className="language-selection__option"
                        disabled={isPending}
                        onClick={() => setLanguage(language.code)}
                    >
                        {language.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default LanguageSelection
