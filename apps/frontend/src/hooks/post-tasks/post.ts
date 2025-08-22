import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { postSchema } from '@/lib/validations/post';
import { useCallback, useState, useEffect } from 'react';
import xss from 'xss';

export const usePost = () => {
    const [errorSanitize, setErrorSanitize] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            schedule: '',
            priority: 'low',
            description: '',
        },
    });

    const onSubmit = useCallback(async (data: z.infer<typeof postSchema>) => {
        const sanitize = {
            title: xss(data.title.trim()),
            schedule: xss(data.schedule.trim()),
            priority: data.priority,
            description: data.description ? xss(data.description.trim()) : null,
        };
        console.log('Data sebelum disanitasi:', sanitize);

        // Validasi sanitasi
        if (
            data.title !== sanitize.title ||
            data.schedule !== sanitize.schedule ||
            data.priority !== sanitize.priority ||
            (data.description && data.description !== sanitize.description)
        ) {
            setErrorSanitize(
                'Demi keamanan, kami tidak dapat memproses data Anda.'
            );
            return;
        }

        setErrorSanitize('');

        try {
            console.log('Data yang telah disanitasi:', sanitize);
            setSuccessMessage('Post berhasil!');
        } catch {
            setErrorSanitize('Terjadi kesalahan saat melakukan post.');
        }
    }, []);

    // Auto clear errorSanitize setelah 3 detik
    useEffect(() => {
        if (errorSanitize) {
            const timeout = setTimeout(() => {
                setErrorSanitize('')
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorSanitize]);

    // Auto clear successMessage setelah 3 detik
    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage('')
                form.reset();
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [successMessage, form]);

    return { form, onSubmit, errorSanitize, successMessage };
};