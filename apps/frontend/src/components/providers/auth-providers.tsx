// AuthProvider.tsx
import { useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/services/useProfile';
import { useLogoutAuth } from '@/services/useLogoutAuth';
import type { User } from '@/types/auth/auth';
import { AuthContext } from '@/hooks/auth/useAuth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const { fetchProfile } = useProfile();
	const { logoutUser } = useLogoutAuth();

	// Fungsi ambil profile dari server
	const loadProfile = useCallback(async () => {
		await fetchProfile({ setUser, setLoading });
	}, [fetchProfile]);

	useEffect(() => {
		if (!user) loadProfile();
	}, [loadProfile, user]);

	const logout = useCallback(async () => {
		await logoutUser({ setUser });
	}, [logoutUser]);

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				loadProfile,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
