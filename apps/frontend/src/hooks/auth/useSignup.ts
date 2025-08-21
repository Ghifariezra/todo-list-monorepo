import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from '@/lib/validations/signup';
import { useCallback, useState, useEffect } from 'react';
import { useSignupMutation } from '@/hooks/mutation/useSignupMutation';
import { useDirect } from '@/hooks/direction/useDirect';
import xss from 'xss';

const useSignup = () => {
    const { login } = useDirect();
    const [errorSanitize, setErrorSanitize] = useState('');
    const { signupUser, isLoading } = useSignupMutation();

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            country: '',
            dateOfBirth: undefined,
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = useCallback(
        async (values: z.infer<typeof signupSchema>) => {
            const sanitize = {
                name: xss(values.name.trim()),
                email: xss(values.email.toLowerCase().trim()),
                phone: xss(values.phone.trim()),
                country: xss(values.country.trim()),
                dateOfBirth: values.dateOfBirth,
                password: xss(values.password.trim()),
                confirmPassword: xss(values.confirmPassword.trim()),
            };

            // Validasi sanitasi
            const changed =
                values.name !== sanitize.name ||
                values.email !== sanitize.email ||
                values.password !== sanitize.password ||
                values.confirmPassword !== sanitize.confirmPassword ||
                values.phone !== sanitize.phone ||
                values.country !== sanitize.country ||
                values.dateOfBirth !== sanitize.dateOfBirth;

            if (changed) {
                setErrorSanitize(
                    'Terjadi kesalahan pada input. Demi keamanan, kami tidak dapat memproses data Anda.'
                );
                return;
            }

            setErrorSanitize('');

            try {
                // signupUser sekarang berupa mutateAsync dari useMutation
                await signupUser({ setErrorSanitize, sanitize });

                // redirect ke halaman signup sukses / dashboard
                login();
            } catch (error: unknown) {
                console.error(error);
            }
        },
        [signupUser, login]
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

export { useSignup };
