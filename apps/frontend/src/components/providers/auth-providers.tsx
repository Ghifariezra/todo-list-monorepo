import { useState, useEffect, useCallback } from 'react';
import { useUserProfileQuery } from '@/hooks/query/user/useUserProfileQuery';
import { useLogoutMutation } from '@/hooks/mutation/useLogoutMutation';
import { useRefreshMutation } from '@/hooks/mutation/useRefreshMutation';
import { useInterceptor } from '@/services/refresh/interceptor';
import type { UserProfile } from '@/types/auth/auth';
import { AuthContext } from '@/hooks/auth/useAuth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true); // Pastikan refetch disertakan dari useUserProfileQuery

	const { data, isLoading } = useUserProfileQuery();
	const { logoutUser } = useLogoutMutation();
	const { refreshUser } = useRefreshMutation();
	const { interceptor } = useInterceptor({ refreshUser, setUser });

	useEffect(() => {
		setLoading(isLoading);
		if (data) setUser(data);
	}, [data, isLoading]);

	const logout = useCallback(async () => {
		await logoutUser({ setUser });
	}, [logoutUser]);

	useEffect(() => {
		const cleanupInterceptor = interceptor();
		return () => cleanupInterceptor();
	}, [interceptor]);

	return <AuthContext.Provider value={{ user, loading, logout, setUser }}>{children}</AuthContext.Provider>;
};