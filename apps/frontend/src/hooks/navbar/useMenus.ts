import { useState, useCallback, useMemo } from 'react';
import type { User } from '@/types/auth/auth';
import { MenusData } from '@/utilities/navbar/menu';

export const useMenus = ({ user }: { user: User | null }) => {
    const [open, setOpen] = useState(false);

    const menus = useMemo(() => {
        const excludeNames = user
            ? ['Home', 'About', 'Login', 'Sign Up']
            : ['Logout', 'Dashboard', 'Tasks', 'Projects'];

        return MenusData.filter(menu => !excludeNames.includes(menu.name));
    }, [user]);


    const toggleOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return { open, toggleOpen, menus };
}