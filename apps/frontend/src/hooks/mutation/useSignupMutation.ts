import { useMutation } from "@tanstack/react-query";
import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import type { signupSchema } from '@/lib/validations/signup';
import { signupRequest } from "@/services/auth/signupRequest";
import type z from 'zod';

// Hook React Query untuk signup
const useSignupMutation = () => {
    const { data: token, refetch } = useUserCsrfQuery();

    const mutation = useMutation({
        mutationFn: ({ sanitize, setErrorSanitize }: { sanitize: z.infer<typeof signupSchema>; setErrorSanitize?: (error: string) => void; }) =>
            signupRequest({ sanitize, setErrorSanitize }, token, refetch),
    });

    return {
        signupUser: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

export { useSignupMutation };