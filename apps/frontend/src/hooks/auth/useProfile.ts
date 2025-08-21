import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/lib/validations/profile";
import { useCallback, useEffect, useState } from "react";
import xss from "xss";
import { useAuth } from "@/hooks/auth/useAuth";
import { useDirect } from "@/hooks/direction/useDirect";
import { useUpdateUserMutation, useUpdateUserImageMutation } from "@/hooks/mutation/useProfileMutation";

const useProfile = () => {
    const { user, loading, setUser } = useAuth();
    const { checkRoot } = useDirect();
    const [errorSanitize, setErrorSanitize] = useState("");

    // React Hook Form
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            country: "",
            date_of_birth: undefined,
            title: "",
            bio: "",
            profile_picture_url: null,
        },
    });

    // Reset form ketika data user tersedia
    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                country: user.country || "",
                date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : undefined,
                title: user.title || "",
                bio: user.bio || "",
                profile_picture_url: null,
            });
        }
    }, [user, form]);

    // Mutation modular
    const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUserMutation();
    const { mutateAsync: updateUserImage } = useUpdateUserImageMutation();

    const onSubmit = useCallback(
        async (values: z.infer<typeof profileSchema>) => {
            const sanitize = {
                name: xss(values.name?.trim() ?? ""),
                email: xss(values.email?.toLowerCase().trim() ?? ""),
                phone: xss(values.phone?.trim() ?? ""),
                country: xss(values.country?.trim() ?? ""),
                date_of_birth: values.date_of_birth,
                title: xss(values.title?.trim() ?? ""),
                bio: xss(values.bio?.trim() ?? ""),
            };

            const file = values.profile_picture_url as unknown as File | null;

            try {
                setErrorSanitize("");
                const newData = (await updateUser(sanitize)).user;
                setUser(newData);

                if (file) {
                    const imageData = await updateUserImage(file);
                    if (newData) {
                        setUser({
                            ...newData,
                            profile_picture_url: imageData.url,
                        });
                    }
                }

                checkRoot(user);
            } catch {
                setErrorSanitize("Gagal update profil. Silakan coba lagi.");
            }
        },
        [updateUser, updateUserImage, checkRoot, user, setUser]
    );

    // Auto clear errorSanitize setelah 3 detik
    useEffect(() => {
        if (errorSanitize) {
            const timeout = setTimeout(() => setErrorSanitize(""), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorSanitize]);

    return {
        form,
        onSubmit,
        errorSanitize,
        loading: isUpdating,
        isLoading: loading,
        ...user,
    };
};

export { useProfile };
