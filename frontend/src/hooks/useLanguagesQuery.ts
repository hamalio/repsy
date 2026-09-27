import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Language } from "@/types/languages"
import { API_BASE_URL } from "@/constants/api"

export const useLanguagesQuery = (initData: string | undefined) => {
    return useQuery({
        queryKey: ["languages"],
        queryFn: async () => {
            const result = await axios.get(`${API_BASE_URL}/api/languages`, {
                headers: {
                    Authorization: `Bearer ${initData}`,
                },
            })
            return result.data as Language[]
        },
        enabled: !!initData,
    })
}
