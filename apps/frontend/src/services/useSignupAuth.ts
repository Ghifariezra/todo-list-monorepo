import axios from "axios";
import { useCallback } from "react";
import { useCsrf } from '@/services/useCsrf';
import { useNavigate } from 'react-router-dom';

const useSignupAuth = () => {
    const navigate = useNavigate();
    const { fetchCsrf } = useCsrf();

    const signupUser = useCallback(async ({ setErrorSanitize, sanitize }: { setErrorSanitize?: (error: string) => void; sanitize: { email: string; password: string; }; }) => {

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

        navigate('/login', { replace: true });
        navigate(0);
    }, [fetchCsrf, navigate]);

    return { signupUser };
}

export { useSignupAuth };