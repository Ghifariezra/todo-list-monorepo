import axios, { isAxiosError } from "axios";
import { useCallback } from "react";
import { useCsrf } from '@/services/auth/useCsrf';
import type { signupSchema } from '@/lib/validations/signup';
import type z from 'zod';

const useSignupAuth = () => {
    const { fetchCsrf } = useCsrf();

    const signupUser = useCallback(async ({ setErrorSanitize, sanitize }: { setErrorSanitize?: (error: string) => void; sanitize: z.infer<typeof signupSchema>; }) => {

        try {
            const token = await fetchCsrf({ setErrorSanitize });

            await axios.post(
                '/api/auth/signup',
                sanitize,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': token
                    },
                    withCredentials: true
                }
            );
            
            return true;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                console.log(error);
                setErrorSanitize?.(error?.response?.data.message);
            }
        }
    }, [fetchCsrf]);

    return { signupUser };
}

export { useSignupAuth };