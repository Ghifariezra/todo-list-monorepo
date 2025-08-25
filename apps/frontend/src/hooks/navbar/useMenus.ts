import { useState, useCallback, useMemo } from 'react';
import type { UserProfile } from '@/types/auth/auth';
import { MenusData } from '@/utilities/navbar/menu';

export const useMenus = ({ user }: { user: UserProfile | null }) => {
    const [open, setOpen] = useState(false);

    const menus = useMemo(() => {
        const excludeNames = user
            ? ['Home', 'About', 'Login', 'Sign Up']
            : ['Dashboard', 'Tasks', 'Profile', 'Logout'];

        return MenusData.filter(menu => !excludeNames.includes(menu.name));
    }, [user]);

    const toggleOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return { open, toggleOpen, menus };
}