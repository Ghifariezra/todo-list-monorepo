import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { postSchema } from '@/lib/validations/post';
import { useCallback, useState, useEffect } from 'react';
import xss from 'xss';
import { useTasksPostMutation } from '@/hooks/mutation/tasks/useTasksPostMutation';
import type { TaskPriority } from "@/types/task/task";
import { normalizeDate } from '@/utilities/date/formatter-date';

export const usePost = () => {
    const [errorSanitize, setErrorSanitize] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { createTask, isLoading } = useTasksPostMutation();

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            schedule: new Date(),
            priority: 'low',
            description: '',
        },
    });

    const onSubmit = useCallback(async (data: z.infer<typeof postSchema>) => {
        const sanitize = {
            title: xss(data.title.trim()),
            schedule: data.schedule ? normalizeDate(new Date(data.schedule)) : null,
            priority: data.priority as TaskPriority,
            description: data.description ? xss(data.description.trim()) : null,
        };

        if (
            data.title !== xss(data.title.trim()) ||
            data.priority !== sanitize.priority ||
            (data.description && data.description !== sanitize.description)
        ) {
            setErrorSanitize('Cek kembali input anda.');
            return;
        }

        setErrorSanitize('');

        try {
            await createTask(sanitize);
            setSuccessMessage('Post berhasil!');
        } catch {
            setErrorSanitize('Terjadi kesalahan saat melakukan post.');
        }
    }, [createTask]);


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

    return { form, onSubmit, errorSanitize, successMessage, isLoading };
};