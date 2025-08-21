import axios from "axios";
import Cookies from "js-cookie";

export const tokenRequest = async (): Promise<string> => {
    try {
        const res = await axios.get("/api/auth/csrf-token", { withCredentials: true });
        const token = res.data.csrfToken || Cookies.get("_csrf");

        if (!token) throw new Error("CSRF token tidak tersedia");

        return token;
    } catch (err) {
        console.error("Gagal fetch CSRF token:", err);
        throw err;
    }
};  