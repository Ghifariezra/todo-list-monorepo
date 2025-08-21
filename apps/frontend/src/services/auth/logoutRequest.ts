import axios from "axios";

export const logoutRequest = async (csrfToken: string) => {
    await axios.post(
        "/api/auth/logout",
        null,
        {
            withCredentials: true,
            headers: {
                "X-CSRF-Token": csrfToken,
            },
        }
    );

    return true;
};
