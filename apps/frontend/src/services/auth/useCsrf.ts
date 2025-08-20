import axios from "axios";
import Cookies from "js-cookie";
import { useCallback } from "react";

const useCsrf = () => {

    const fetchCsrf = useCallback(async ({ setErrorSanitize }: { setErrorSanitize?: (error: string) => void; }) => {
        const csrfRes = await axios.get(
            '/api/auth/csrf-token',
            { withCredentials: true }
        );

        const token = csrfRes.data.csrfToken || Cookies.get('_csrf');

        if (!token) {
            console.error('CSRF token not found');

            setErrorSanitize?.('Gagal mendapatkan CSRF token, silakan coba lagi.');

            return;
        }

        return token;
    }, []);

    return { fetchCsrf }
}

export { useCsrf };