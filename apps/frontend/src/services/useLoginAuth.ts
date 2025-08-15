import axios from "axios";
import { useCallback } from "react";
import { useCsrf } from '@/services/useCsrf';
import { useNavigate } from 'react-router-dom';

const useLoginAuth = () => {
    const navigate = useNavigate();
    const { fetchCsrf } = useCsrf();

    const loginUser = useCallback(async ({ setErrorSanitize, sanitize }: { setErrorSanitize?: (error: string) => void; sanitize: { email: string; password: string; }; }) => {

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

        navigate('/', { replace: true });
        navigate(0);
    }, [fetchCsrf, navigate]);

    return { loginUser };
}

export { useLoginAuth };