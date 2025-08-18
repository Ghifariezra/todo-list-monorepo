import { useCallback, useState, useRef, useEffect } from "react";

const useProfile = () => {
    const [openProfile, setOpenProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

    const toggleProfile = useCallback(() => {
        setOpenProfile((prev) => !prev);
    }, []);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setOpenProfile(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return { 
        openProfile, 
        toggleProfile, 
        profileRef
     };
}

export { useProfile };