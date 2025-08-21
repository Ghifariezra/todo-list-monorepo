// services/update/updateUserRequest.ts
import type { UpdateUserResponse } from "@/types/auth/update/response";
import type { profileSchema } from '@/lib/validations/profile';
import axios from "axios";
import type { z } from "zod";

export const updateUserRequest = async (payload: z.infer<typeof profileSchema>, token?: string): Promise<UpdateUserResponse> => {
  const { data } = await axios.patch<UpdateUserResponse>(
    "/api/auth/user/update",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "X-CSRF-Token": token } : {}),
      },
      withCredentials: true,
    }
  );
  return data;
};