// services/update/updateUserImageRequest.ts
import type { UpdateImageResponse } from "@/types/auth/update/response";
import axios from "axios";

export const updateUserImageRequest = async (file: File, token?: string): Promise<UpdateImageResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post<UpdateImageResponse>(
    "/api/auth/user/upload/profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { "X-CSRF-Token": token } : {}),
      },
      withCredentials: true,
    }
  );
  return data;
};