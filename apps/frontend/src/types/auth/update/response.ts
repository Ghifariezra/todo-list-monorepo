import type { UserProfile } from "@/types/auth/auth";

export interface UpdateUserResponse {
    status: number;
    message: string;
    user: UserProfile;
}

export interface UpdateImageResponse {
    url: string;
}
