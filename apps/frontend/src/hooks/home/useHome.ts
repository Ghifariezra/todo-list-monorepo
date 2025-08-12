import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useHome = () => {
    const navigate = useNavigate();

    const start = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    return { start };
}