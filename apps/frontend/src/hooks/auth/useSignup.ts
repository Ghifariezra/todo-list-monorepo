import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from '@/lib/validations/signup';
import { useCallback, useState, useEffect } from 'react';
import { useSignupAuth } from '@/services/useSignupAuth';
import { useNavigate } from 'react-router-dom';
import xss from 'xss';

const useSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorSanitize, setErrorSanitize] = useState('');
    const { signupUser } = useSignupAuth();

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
            email: xss(values.email.toLowerCase().trim()),
            password: xss(values.password.trim()),
            confirmPassword: xss(values.confirmPassword.trim()),
        }

        if (values.name !== sanitize.name || values.email !== sanitize.email || values.password !== sanitize.password || values.confirmPassword !== sanitize.confirmPassword) {
            setErrorSanitize('Terjadi kesalahan pada input. Demi keamanan, kami tidak dapat memproses data Anda.');
            return;
        }

        setLoading(true);
        setErrorSanitize('');

        try {
            const response = await signupUser({ setErrorSanitize, sanitize });
            setLoading(false);

            if (response) {
                navigate('/auth/login', { replace: true });
            }
        } catch (error: unknown) {
            console.error(error);
        }
    }, [setErrorSanitize, navigate, signupUser, setLoading]);

    useEffect(() => {
        if (errorSanitize) {
            setTimeout(() => setErrorSanitize(''), 3000);
        }
    }, [errorSanitize]);

    return { form, onSubmit, errorSanitize, loading };
};

export { useSignup };
