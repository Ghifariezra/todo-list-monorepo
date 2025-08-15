import { useContext, createContext } from 'react';
import type { AuthContextType } from '@/types/auth/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider');
    return ctx;
};
