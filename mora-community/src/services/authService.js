import api from "@/services/axios.js";

const authService = {
    signUp: async (data) => {
        const res = await api.post("/auth/register", data, { withCredentials: true });
        return res.data;
    },
    signIn: async (data) => {
        const res = await api.post("/auth/login", data, { withCredentials: true });
        return res.data;
    },
    signOut: () => api.post("/auth/logout", null, { withCredentials: true }),
    refresh: async () => {
        try {
            const res = await api.post("/auth/refresh", null, { withCredentials: true });
            return res?.data?.accessToken ?? null;
        } catch (error) {
            console.error('Refresh token API error:', error);
            return null;
        }
    },
    getMe: async (token) => {
        const res = await api.get("/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return res.data;
    }
}

export default authService;