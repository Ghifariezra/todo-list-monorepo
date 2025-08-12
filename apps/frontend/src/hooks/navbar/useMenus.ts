import { useState, useCallback } from 'react';

export const useMenus = () => {
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return { open, toggleOpen }
}