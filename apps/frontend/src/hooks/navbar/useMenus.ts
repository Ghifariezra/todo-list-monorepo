import { useState, useCallback, useMemo } from 'react';
import type { User } from '@/types/auth/auth';
import { MenusData } from '@/utilities/navbar/menu';

export const useMenus = ({ user }: { user: User | null }) => {
    const [open, setOpen] = useState(false);

    const menus = useMemo(() => {
        if (user) {
            return MenusData.filter(menu => menu.name !== 'Login' && menu.name !== 'Sign Up');
        } else {
            return MenusData.filter(menu => menu.name !== 'Logout');
        }
    }, [user]);

    const toggleOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return { open, toggleOpen, menus };
}