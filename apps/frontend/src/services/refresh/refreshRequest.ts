import axios from "axios";

export const refreshRequest = async (csrfToken: string | undefined) => {
    if (!csrfToken) throw new Error("CSRF token tidak tersedia");

    await axios.post(
        "/api/auth/refresh",
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
        }
    );

    return true;
};
