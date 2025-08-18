export interface User {
    userId: string;
    name: string;
    email: string;
    title: string;
    bio: string;
    profile_picture_url: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    loadProfile: () => Promise<void>;
    logout: () => Promise<void>;
}