import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/lib/validations/login';
import { useCallback, useState, useEffect } from 'react';
import { useLoginAuth } from '@/services/useLoginAuth';
import xss from 'xss';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const navigate = useNavigate();
    const [errorSanitize, setErrorSanitize] = useState('');
    const { loginUser } = useLoginAuth();

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

        setErrorSanitize('');

        try {
            const response = await loginUser({ setErrorSanitize, sanitize });

            if (response) {
                navigate('/', { replace: true });
                navigate(0);
            }
        } catch (error: unknown) {
            console.error(error);
        }
    }, [setErrorSanitize, loginUser, navigate]);

    useEffect(() => {
        if (errorSanitize) {
            setTimeout(() => setErrorSanitize(''), 3000);
        }
        // Handle Internal Server Error
    }, [errorSanitize]);

    return { form, onSubmit, errorSanitize };
}

export { useLogin };