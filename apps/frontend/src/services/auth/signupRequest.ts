import axios, { isAxiosError } from "axios";
import type { signupSchema } from '@/lib/validations/signup';
import type z from 'zod';

export const signupRequest = async ({
    sanitize,
    setErrorSanitize,
}: {
    sanitize: z.infer<typeof signupSchema>;
    setErrorSanitize?: (error: string) => void;
    }, token?: string, refetchCsrf?: (() => Promise<{ data?: string }>)
) => {
    try {
        let csrfToken = token;
        if (!csrfToken && refetchCsrf) {
            const refetchResult = await refetchCsrf();
            csrfToken = refetchResult.data;
        }
        if (!csrfToken) throw new Error("CSRF token tidak tersedia");

        await axios.post("/api/auth/signup", sanitize, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
        });

        return true;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const message = error.response?.data?.message || "Terjadi kesalahan server.";
            setErrorSanitize?.(message);
            throw new Error(message);
        }
        throw error;
    }
};
