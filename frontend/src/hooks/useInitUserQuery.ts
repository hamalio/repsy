import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { UserLanguage } from "@/types/languages"
import { API_BASE_URL } from "@/constants/api"


export const useRegisterUserQuery = (initData: string | undefined) => {
    return useQuery({
        queryKey: ["user", "register"],
        queryFn: async () => {
            const result = await axios.post(`${API_BASE_URL}/api/user/register`, null, {
                headers: {
                    Authorization: `Bearer ${initData}`,
                },
            })
            return result.data as UserLanguage
        },
        enabled: !!initData,
        staleTime: Infinity,
    })
}
