import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useHome = () => {
    const navigate = useNavigate();

    const signup = useCallback(() => {
        navigate('/auth/signup');
    }, [navigate]);

    const login = useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);

    return { signup, login };
}