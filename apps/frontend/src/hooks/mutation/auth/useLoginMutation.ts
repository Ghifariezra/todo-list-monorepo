import { useMutation } from "@tanstack/react-query";
import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import { loginRequest } from "@/services/auth/loginRequest";
import type { LoginProps } from "@/types/auth/login/login";

const useLoginMutation = () => {
    const { data: token, refetch: refetchCsrf } = useUserCsrfQuery();

    const mutation = useMutation({
        mutationFn: ({ setErrorSanitize, sanitize }: LoginProps) =>
            loginRequest({ setErrorSanitize, sanitize }, token, refetchCsrf),
    });

    return {
        loginUser: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export { useLoginMutation };
