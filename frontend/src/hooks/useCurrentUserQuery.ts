import { useQuery, } from "@tanstack/react-query"
import axios from "axios"
import { User } from "@/types/users"
import { API_BASE_URL } from "@/constants/api"

export const useCurrentUserQuery = (initData: string | undefined) => {
    return useQuery({
        queryKey: ["user", "me"],
        queryFn: async () => {
            const result = await axios.get(`${API_BASE_URL}/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${initData}`,
                },
            })
            return result.data as User
        },
    })
}