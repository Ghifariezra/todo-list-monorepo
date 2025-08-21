import { useMutation } from "@tanstack/react-query";
import { updateUserRequest } from "@/services/update/updateUserRequest";
import { updateUserImageRequest } from "@/services/update/updateUserImageRequest";
import { useUserCsrfQuery } from "@/hooks/query/token/useUserCsrfQuery";
import type { z } from "zod";
import type { profileSchema } from "@/lib/validations/profile";
import type { UpdateUserResponse, UpdateImageResponse } from "@/types/auth/update/response";

export const useUpdateUserMutation = () => {
    const { data: token } = useUserCsrfQuery();

    return useMutation<UpdateUserResponse, Error, z.infer<typeof profileSchema>>({
        mutationFn: (payload) => updateUserRequest(payload, token)
    });
};

export const useUpdateUserImageMutation = () => {
    const { data: token } = useUserCsrfQuery();

    return useMutation<UpdateImageResponse, Error, File>({
        mutationFn: (file) => updateUserImageRequest(file, token),
    });
};
