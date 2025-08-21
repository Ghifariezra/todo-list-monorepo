import axios, { isAxiosError } from "axios";
import type { LoginProps } from "@/types/auth/login/login";

export const loginRequest = async (
    { setErrorSanitize, sanitize }: LoginProps,
    token?: string,
    refetchCsrf?: () => Promise<{ data?: string }>
) => {
    try {
        let csrfToken = token;
        if (!csrfToken && refetchCsrf) {
            const refetchResult = await refetchCsrf();
            csrfToken = refetchResult.data;
        }
        if (!csrfToken) throw new Error("CSRF token tidak tersedia");

        await axios.post("/api/auth/login", sanitize, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
        });

        return true;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const message = error.response?.data?.message || "Login gagal";
            setErrorSanitize?.(message);
            throw new Error(message);
        }
        throw error;
    }
};