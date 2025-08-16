import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const useLogo = () => {
    const navigate = useNavigate();

    const handleLogoClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return { handleLogoClick };
}

export { useLogo };