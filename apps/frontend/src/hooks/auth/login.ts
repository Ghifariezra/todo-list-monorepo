import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/lib/validations/login';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import xss from 'xss';
import Cookies from 'js-cookie';

const useLogin = () => {
    const navigate = useNavigate();
    const [errorSanitize, setErrorSanitize] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = useCallback(async (values: z.infer<typeof loginSchema>) => {
        const sanitize = {
            email: xss(values.email.trim()),
            password: xss(values.password.trim()),
        }

        if (values.email !== sanitize.email || values.password !== sanitize.password) {
            setErrorSanitize('Terjadi kesalahan pada input. Demi keamanan, kami tidak dapat memproses data Anda.');
            return;
        }

        if (isLoading) {
            return;
        }

        setIsLoading(true);
        setErrorSanitize('');

        try {
            // 1️⃣ Ambil CSRF token dari server
            const csrfRes = await axios.get('/api/auth/csrf-token', { withCredentials: true });
            const token = csrfRes.data.csrfToken || Cookies.get('_csrf');

            if (!token) {
                setErrorSanitize('Gagal mendapatkan CSRF token, silakan coba lagi.');
                return;
            }

            await axios.post(
                '/api/auth/login',
                sanitize,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': token,
                    },
                    withCredentials: true,
                }
            )

            navigate('/');
        } catch (error: unknown) {
            console.error(error);
            setErrorSanitize('Terjadi kesalahan pada input. Demi keamanan, kami tidak dapat memproses data Anda.');
        }

    }, [setErrorSanitize, isLoading, navigate]);

    useEffect(() => {
        if (errorSanitize) {
            setTimeout(() => setErrorSanitize(''), 3000);
        }
    }, [errorSanitize]);

    return { form, onSubmit, errorSanitize };
}

export { useLogin };