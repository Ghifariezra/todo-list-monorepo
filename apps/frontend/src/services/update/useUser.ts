import axios from "axios";
import type { UserProfile, ResponseUser } from "@/types/auth/auth";

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const { data } = await axios.get<ResponseUser>("/api/auth/user", {
    withCredentials: true,
  });
  
  return data.user;
};