import type { Menus } from '@/types/navbar/menus';

export const MenusData: Array<Menus> = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Projects', href: '/projects' },
    { name: 'Login', href: '/auth/login' },
    { name: 'Sign Up', href: '/auth/signup' },
    { name: 'Logout', href: '/logout' }
];