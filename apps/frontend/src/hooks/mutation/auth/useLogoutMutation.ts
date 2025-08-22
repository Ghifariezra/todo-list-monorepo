import { useMutation } from "@tanstack/react-query";
import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import { logoutRequest } from "@/services/auth/logoutRequest";
import type { UserProfile } from '@/types/auth/auth';

type LogoutVariables = {
    setUser: (user: UserProfile | null) => void;
};

export const useLogoutMutation = () => {
    const { data: token, refetch } = useUserCsrfQuery();

    const mutation = useMutation({
        mutationFn: async ({ setUser }: LogoutVariables) => {
            const csrfToken = token ?? (await refetch()).data;
            if (!csrfToken) throw new Error("CSRF token tidak tersedia");

            await logoutRequest(csrfToken);

            setUser(null);
            return true;
        },
    });

    return {
        logoutUser: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
