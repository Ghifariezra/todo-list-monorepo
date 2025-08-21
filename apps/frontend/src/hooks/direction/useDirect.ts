import type { UserProfile } from "@/types/auth/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useDirect = () => {
    const navigate = useNavigate();

    const home = useCallback(() => {
        navigate('/home');
    }, [navigate]);

    const signup = useCallback(() => {
        navigate('/auth/signup');
    }, [navigate]);

    const login = useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);

    const dashboard = useCallback(() => {
        navigate('/dashboard', { replace: true });
        navigate(0);
    }, [navigate]);

    const profile = useCallback(() => {
        navigate('/dashboard/profile');
    }, [navigate]);

    const checkRoot = useCallback((user: UserProfile | null) => {
        const findRoot = user ? '/dashboard' : '/';
        navigate(findRoot);
    }, [navigate]);

    const back = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return { 
        home,
        signup,
        login,
        dashboard,
        profile,
        checkRoot,
        back
     };
}