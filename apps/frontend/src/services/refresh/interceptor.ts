import type { UserProfile } from '@/types/auth/auth';
import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';

const useInterceptor = ({ refreshUser, setUser }: { refreshUser: ({ setErrorSanitize }: { setErrorSanitize?: (error: string) => void; }) => Promise<boolean>; setUser: (user: UserProfile | null) => void; }) => {

    // 👇 INI BAGIAN KUNCI PENGGUNAAN useRefresh 👇
    const interceptor = useCallback(() => {
        const interceptor = axios.interceptors.response.use(
            (res) => res,
            async (error: AxiosError) => {
                const originalRequest = error.config;
                console.error('Axios error:', originalRequest);

                // Jika error 401 dan bukan request refresh
                if (error.response?.status === 401 && originalRequest && originalRequest.url !== '/api/auth/refresh') {
                    try {
                        const success = await refreshUser({})
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

    return { interceptor };
}

export { useInterceptor };