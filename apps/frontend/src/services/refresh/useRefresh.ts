import axios, { isAxiosError } from "axios";
import { useCallback } from "react";
import { useCsrf } from "@/services/useCsrf";

const useRefresh = () => {
    const { fetchCsrf } = useCsrf();

    const refreshUser = useCallback(
        async ({ setErrorSanitize }: { setErrorSanitize?: (error: string) => void }): Promise<boolean> => {
            try {
                const token = await fetchCsrf({ setErrorSanitize });

                await axios.post(
                    "/api/auth/refresh",
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-Token": token,
                        },
                        withCredentials: true,
                    }
                );

                return true;
            } catch (error: unknown) {
                if (isAxiosError(error)) {
                    console.error("Refresh failed:", error.response?.data || error.message);
                }
                return false;
            }
        },
        [fetchCsrf]
    );

    return { refreshUser };
};

export { useRefresh };
