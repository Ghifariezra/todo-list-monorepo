import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/lib/validations/login';
import { useCallback, useState, useEffect } from 'react';
import {
    useLoginMutation
} from '@/hooks/mutation/auth/useLoginMutation';
import xss from 'xss';
import { useDirect } from '@/hooks/direction/useDirect';

const useLogin = () => {
    const { dashboard } = useDirect();
    const [errorSanitize, setErrorSanitize] = useState('');
    const { loginUser, isLoading } = useLoginMutation();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = useCallback(
        async (values: z.infer<typeof loginSchema>) => {
            const sanitize = {
                email: xss(values.email.trim()),
                password: xss(values.password.trim()),
            };

            // Validasi sanitasi
            if (values.email !== sanitize.email || values.password !== sanitize.password) {
                setErrorSanitize(
                    'Terjadi kesalahan pada input. Demi keamanan, kami tidak dapat memproses data Anda.'
                );
                return;
            }

            setErrorSanitize('');

            try {
                // loginUser sekarang berupa mutateAsync dari useMutation
                await loginUser({ setErrorSanitize, sanitize });

                // redirect ke dashboard
                dashboard();
            } catch (error: unknown) {
                console.error(error);
            }
        },
        [loginUser, dashboard]
    );

    // Auto clear errorSanitize setelah 3 detik
    useEffect(() => {
        if (errorSanitize) {
            const timeout = setTimeout(() => setErrorSanitize(''), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorSanitize]);

    return { form, onSubmit, errorSanitize, isLoading };
};

export { useLogin };
