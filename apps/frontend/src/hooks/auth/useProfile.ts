import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { profileSchema } from '@/lib/validations/profile';
import { useCallback, useEffect, useState } from 'react';
import { QueryUserProfile } from "@/hooks/query/update/useUserProfile";
import { useMutation } from "@tanstack/react-query";
import { useUpdateUser } from "@/services/update/useUpdate";
import xss from 'xss';
import { useAuth } from '@/hooks/auth/useAuth';
import { useDirect } from '@/hooks/direction/useDirect';

const useProfile = () => {
    const { user } = useAuth();
    const { checkRoot } = useDirect();
    const { data, isLoading } = QueryUserProfile();
    const [errorSanitize, setErrorSanitize] = useState('');
    const { updateUser } = useUpdateUser();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            country: '',
            date_of_birth: undefined,
            title: '',
            bio: '',
        },
    });

    // Reset form ketika data user berhasil di-fetch
    useEffect(() => {
        if (data) {
            form.reset({
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                country: data.country || '',
                date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
                title: data.title || '',
                bio: data.bio || '',
            });
        }
    }, [data, form]);

    // React Query Mutation
    const { mutateAsync, isPending } = useMutation({
        mutationFn: updateUser,
    });

    const onSubmit = useCallback(
        async (values: z.infer<typeof profileSchema>) => {
            const sanitize = {
                name: xss(values.name?.trim() ?? ''),
                email: xss(values.email?.toLowerCase().trim() ?? ''),
                phone: xss(values.phone?.trim() ?? ''),
                country: xss(values.country?.trim() ?? ''),
                date_of_birth: values.date_of_birth,
                title: xss(values.title?.trim() ?? ''),
                bio: xss(values.bio?.trim() ?? ''),
            };

            // Cek kalau ada input aneh setelah disanitize
            if (
                values.name !== sanitize.name ||
                values.email !== sanitize.email ||
                values.phone !== sanitize.phone ||
                values.country !== sanitize.country ||
                values.title !== sanitize.title ||
                values.bio !== sanitize.bio
            ) {
                setErrorSanitize(
                    'Terjadi kesalahan pada input. Demi keamanan, kami tidak dapat memproses data Anda.'
                );
                return;
            }

            try {
                setErrorSanitize('');
                const response = await mutateAsync(sanitize);

                if (response) {
                    checkRoot(user);
                }
            } catch {
                setErrorSanitize("Gagal update profil. Silakan coba lagi.");
            }
        },
        [mutateAsync, checkRoot, user]
    );

    // Auto clear errorSanitize setelah 3 detik
    useEffect(() => {
        if (errorSanitize) {
            const timeout = setTimeout(() => setErrorSanitize(''), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorSanitize]);

    return {
        form,
        onSubmit,
        errorSanitize,
        loading: isPending,
        isLoading, // loading saat fetch profile awal
        ...data
    };
};

export { useProfile };
