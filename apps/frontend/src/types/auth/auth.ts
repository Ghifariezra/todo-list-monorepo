export interface User {
    userId: string;
    name: string;
    email: string;
}

export interface Profile {
    userId: string;
    name: string;
    email: string;
    title: string;
    bio: string;
    profile_picture_url: string;
}

export interface UserProfile extends Omit<Profile, 'userId'> {
    id: string;
    phone: string;
    country: string;
    date_of_birth: string;
};

export interface ResponseUser {
    message: string;
    status: number;
    user: UserProfile;
}

export interface AuthContextType {
    user: Profile | null;
    loading: boolean;
    loadProfile: () => Promise<void>;
    logout: () => Promise<void>;
}