import { useAuth } from '@/hooks/auth/useAuth';
import { Navigate } from 'react-router-dom';

export default function ProtectedNotAuth({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Memuat...</div>;
	}

	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	return <>{children}</>;
}