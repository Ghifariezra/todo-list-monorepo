import { useAuth } from '@/hooks/auth/useAuth';
import { Navigate } from 'react-router-dom';

export default function Protected({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
}