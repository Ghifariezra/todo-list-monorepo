import axios from "axios";
import { useCallback } from "react";
import type { Profile } from '@/types/auth/auth';
import { useCsrf } from '@/services/auth/useCsrf';

const useLogoutAuth = () => {
    const { fetchCsrf } = useCsrf();

    const logoutUser = useCallback(async ({ setUser }: { setUser: (user: Profile | null) => void; }) => {

        const token = await fetchCsrf({ setErrorSanitize: undefined });

        await axios.post(
            '/api/auth/logout',
            null,
            {
                withCredentials: true,
                headers: {
                    'X-CSRF-Token': token,
                },
            }
        );

        setUser(null);
    }, [fetchCsrf]);

    return { logoutUser };
}

export { useLogoutAuth };