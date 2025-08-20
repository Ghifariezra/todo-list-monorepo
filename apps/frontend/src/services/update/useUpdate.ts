import { useCsrf } from '@/services/auth/useCsrf';
import type { UserProfile } from "@/types/auth/auth";
import type { profileSchema } from '@/lib/validations/profile';
import type z from 'zod';
import axios from "axios";

export function useUpdateUser() {
  const { fetchCsrf } = useCsrf();

  const updateUser = async (payload: z.infer<typeof profileSchema>): Promise<UserProfile> => {
    const token = await fetchCsrf({ setErrorSanitize: undefined });
    const { data } = await axios.patch<UserProfile>(
      "/api/auth/user/update",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        withCredentials: true,
      }
    );
    return data;
  };

  return { updateUser };
}
