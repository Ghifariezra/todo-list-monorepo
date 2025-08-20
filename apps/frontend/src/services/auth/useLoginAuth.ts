import axios, { isAxiosError } from "axios";
import { useCallback } from "react";
import { useCsrf } from '@/services/auth/useCsrf';

const useLoginAuth = () => {
    const { fetchCsrf } = useCsrf();

    const loginUser = useCallback(async ({ setErrorSanitize, sanitize }: { setErrorSanitize?: (error: string) => void; sanitize: { email: string; password: string; }; }) => {

        try {
            const token = await fetchCsrf({ setErrorSanitize });

            await axios.post(
                '/api/auth/login',
                sanitize,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': token,
                    },
                    withCredentials: true,
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

    return { loginUser };
}

export { useLoginAuth };