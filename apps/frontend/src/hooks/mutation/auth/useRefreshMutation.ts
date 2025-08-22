import { useMutation } from "@tanstack/react-query";
import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import { refreshRequest } from "@/services/refresh/refreshRequest";

type RefreshVariables = { setErrorSanitize?: (error: string) => void };

export const useRefreshMutation = () => {
    const { data: token, refetch } = useUserCsrfQuery();

    const mutation = useMutation({
        mutationFn: async ({ setErrorSanitize }: RefreshVariables) => {
            try {
                const csrfToken = token ?? (await refetch()).data;
                return await refreshRequest(csrfToken);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorSanitize?.(error.message);
                }
                throw error;
            }
        },
    });

    return {
        refreshUser: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
