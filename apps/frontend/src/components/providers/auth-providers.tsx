// AuthProvider.tsx
import { useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/services/auth/useProfile';
import { useLogoutAuth } from '@/services/auth/useLogoutAuth';
import { useRefresh } from '@/services/refresh/useRefresh';
import { useInterceptor } from '@/services/refresh/interceptor';
import type { Profile } from '@/types/auth/auth';
import { AuthContext } from '@/hooks/auth/useAuth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<Profile | null>(null);
	const [loading, setLoading] = useState(true);
	const { fetchProfile } = useProfile();
	const { logoutUser } = useLogoutAuth();
	const { refreshUser } = useRefresh();
	const { interceptor } = useInterceptor({ refreshUser, setUser });

	// Fungsi ambil profile dari server
	const loadProfile = useCallback(async () => {
		await fetchProfile({ setUser, setLoading });
	}, [fetchProfile]);

	useEffect(() => {
		// Hanya panggil loadProfile() saat komponen pertama kali dimuat
		// atau saat user null dan loading masih true.
		if (!user && loading) {
			loadProfile();
		}
	}, [loadProfile, user, loading]);

	const logout = useCallback(async () => {
		await logoutUser({ setUser });
	}, [logoutUser]);

	useEffect(() => {
		// Tambahkan interceptor saat komponen dimuat
		const cleanupInterceptor = interceptor();
		
		return () => {
			// Hapus interceptor saat komponen unmount
			cleanupInterceptor();
		};
	}, [interceptor]);

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
