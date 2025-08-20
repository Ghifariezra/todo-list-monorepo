import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from '@/lib/validations/signup';
import { useCallback, useState, useEffect } from 'react';
import { useSignupAuth } from '@/services/auth/useSignupAuth';
import { useDirect } from '@/hooks/direction/useDirect';
import xss from 'xss';

const useSignup = () => {
    const { signup } = useDirect();
    const [loading, setLoading] = useState(false);
    const [errorSanitize, setErrorSanitize] = useState('');
    const { signupUser } = useSignupAuth();

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

    const onSubmit = useCallback(async (values: z.infer<typeof signupSchema>) => {
        const sanitize = {
            name: xss(values.name.trim()),
            email: xss(values.email.toLowerCase().trim()),
            phone: xss(values.phone.trim()),
            country: xss(values.country.trim()),
            dateOfBirth: values.dateOfBirth,
            password: xss(values.password.trim()),
            confirmPassword: xss(values.confirmPassword.trim()),
        }

        if (values.name !== sanitize.name || values.email !== sanitize.email || values.password !== sanitize.password || values.confirmPassword !== sanitize.confirmPassword || values.phone !== sanitize.phone || values.country !== sanitize.country || values.dateOfBirth !== sanitize.dateOfBirth) {
            setErrorSanitize('Terjadi kesalahan pada input. Demi keamanan, kami tidak dapat memproses data Anda.');
            return;
        }

        setLoading(true);
        setErrorSanitize('');

        try {
            const response = await signupUser({ setErrorSanitize, sanitize });
            setLoading(false);

            if (response) {
                signup();
            }
        } catch (error: unknown) {
            console.error(error);
        }
    }, [setErrorSanitize, signupUser, signup]);

    useEffect(() => {
        if (errorSanitize) {
            setTimeout(() => setErrorSanitize(''), 3000);
        }
    }, [errorSanitize]);

    return { form, onSubmit, errorSanitize, loading };
};

export { useSignup };
