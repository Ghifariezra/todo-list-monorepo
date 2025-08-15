export interface User {
    userId: string;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    loadProfile: () => Promise<void>;
    logout: () => Promise<void>;
}