import { useQuery } from "@tanstack/react-query";
import { profileRequest } from "@/services/auth/profileRequest";

export const useUserProfileQuery = () => {
    const { fetchProfile } = profileRequest();

    return useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => await fetchProfile(),
        staleTime: 1000 * 60 * 5, // 5 menit
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
