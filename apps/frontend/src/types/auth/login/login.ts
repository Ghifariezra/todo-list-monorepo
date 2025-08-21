interface LoginData {
    email: string;
    password: string;
}

export interface LoginProps {
    setErrorSanitize?: (error: string) => void;
    sanitize: LoginData;
}