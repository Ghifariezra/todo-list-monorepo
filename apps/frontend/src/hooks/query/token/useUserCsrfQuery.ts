import { useQuery } from "@tanstack/react-query";
import { tokenRequest } from "@/services/auth/tokenRequest";

export const useUserCsrfQuery = () => {
    const query = useQuery({
        queryKey: ["userCsrfToken"],
        queryFn: tokenRequest,
        staleTime: 1000 * 60 * 5, // 5 menit
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return query;
};