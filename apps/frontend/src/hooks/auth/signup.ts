import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from '@/lib/validations/signup';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import xss from 'xss';
import Cookies from 'js-cookie';


const useSignup = () => {
    const navigate = useNavigate();
    const [errorSanitize, setErrorSanitize] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = useCallback(async (values: z.infer<typeof signupSchema>) => {
        const sanitize = {
            name: xss(values.name.trim()),
            email: xss(values.email.trim()),
            password: xss(values.password.trim()),
            confirmPassword: xss(values.confirmPassword.trim()),
        }

        if (values.name !== sanitize.name || values.email !== sanitize.email || values.password !== sanitize.password || values.confirmPassword !== sanitize.confirmPassword) {
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

            // 2️⃣ Set header token untuk request POST
            await axios.post(
                '/api/auth/signup',
                sanitize,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': token
                    },
                    withCredentials: true
                }
            );
            navigate('/login', { replace: true });
        } catch (error: unknown) {
            console.error(error);
        }
    }, [setErrorSanitize, isLoading, navigate]);

    useEffect(() => {
        if (errorSanitize) {
            setTimeout(() => setErrorSanitize(''), 3000);
        }
    }, [errorSanitize]);

    return { form, onSubmit, errorSanitize };
};

export { useSignup };