import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/services/update/useUser";

export const QueryUserProfile = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
        retry: false,
    });
};
