import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { UserLanguage } from "@/types/languages"
import { API_BASE_URL } from "@/constants/api"


export const useSetLanguageMutation = (initData: string | undefined) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (languageCode: string) => {
            const result = await axios.put(
                `${API_BASE_URL}/api/user/me/language`,
                { language_code: languageCode },
                {
                    headers: {
                        Authorization: `Bearer ${initData}`,
                    },
                },
            )
            return result.data as UserLanguage
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user", "register"], data)
            queryClient.invalidateQueries({ queryKey: ["user", "me"] })
        },
    })
}
