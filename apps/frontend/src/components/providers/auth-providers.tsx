// AuthProvider.tsx
import { useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/services/useProfile';
import { useLogoutAuth } from '@/services/useLogoutAuth';
import { useRefresh } from '@/services/refresh/useRefresh';
import type { User } from '@/types/auth/auth';
import { AuthContext } from '@/hooks/auth/useAuth';
import axios, { AxiosError } from 'axios';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const { fetchProfile } = useProfile();
	const { logoutUser } = useLogoutAuth();
	const { refreshUser } = useRefresh();

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

	// 👇 INI BAGIAN KUNCI PENGGUNAAN useRefresh 👇
	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			(res) => res,
			async (error: AxiosError) => {
				const originalRequest = error.config;
				console.error('Axios error:', originalRequest);

				// Jika error 401 dan bukan request refresh
				if (error.response?.status === 401 && originalRequest && originalRequest.url !== '/api/auth/refresh') {
					try {
						const success = await refreshUser({});
						if (success) {
							// Jika refresh berhasil, ulangi request aslinya
							return axios(originalRequest);
						} else {
							// Jika refresh gagal, logout user
							setUser(null);
						}
					} catch (err) {
						// Jika ada error, logout user
						setUser(null);
						return Promise.reject(err);
					}
				}
				return Promise.reject(error);
			}
		);

		// Fungsi cleanup untuk menghapus interceptor saat komponen di-unmount
		return () => {
			axios.interceptors.response.eject(interceptor);
		};
	}, [refreshUser, setUser]); // Tambahkan setUser sebagai dependency

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
