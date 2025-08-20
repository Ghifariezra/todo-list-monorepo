import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/lib/validations/login';
import { useCallback, useState, useEffect } from 'react';
import { useLoginAuth } from '@/services/auth/useLoginAuth';
import xss from 'xss';
import { useDirect } from '@/hooks/direction/useDirect';

const useLogin = () => {
    const { dashboard } = useDirect();
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
                dashboard();
            }
        } catch (error: unknown) {
            console.error(error);
        }
    }, [setErrorSanitize, loginUser, dashboard]);

    useEffect(() => {
        if (errorSanitize) {
            setTimeout(() => setErrorSanitize(''), 3000);
        }
        // Handle Internal Server Error
    }, [errorSanitize]);

    return { form, onSubmit, errorSanitize };
}

export { useLogin };