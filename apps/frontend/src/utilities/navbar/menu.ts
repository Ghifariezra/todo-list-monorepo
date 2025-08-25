import type { Menus } from '@/types/navbar/menus';

export const MenusData: Array<Menus> = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    
    // Dashboard
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Tasks', href: '/dashboard/tasks' },
    
    // Auth
    { name: 'Login', href: '/auth/login' },
    { name: 'Sign Up', href: '/auth/signup' }
];