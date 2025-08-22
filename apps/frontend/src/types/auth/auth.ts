import type { Control, FieldValues, Path } from 'react-hook-form';

export type DatePickerFormProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    date_of_birth?: string | null;
    from?: boolean;
};

export interface User {
    userId: string;
    name: string;
    email: string;
}

export interface Profile extends User {
    title: string;
    bio: string;
    profile_picture_url: string;
}

export interface UserProfile extends Omit<Profile, 'userId'> {
    id: string;
    phone: string;
    country: string;
    date_of_birth: string;
    profile_picture_url: string;
    createdAt: string;
};

export interface ResponseUser {
    message: string;
    status: number;
    user: UserProfile;
}

export interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
    setUser: (user: UserProfile | null) => void;
}