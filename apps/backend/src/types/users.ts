export interface userPayload {
    userId: string;
    name: string;
    email: string;
};

export interface User extends Omit<userPayload, 'userId'> {
    id: string;
    title?: string;
    bio?: string;
    profile_picture_url?: string;
    phone?: string;
    country?: string;
    dateOfBirth?: string;
};