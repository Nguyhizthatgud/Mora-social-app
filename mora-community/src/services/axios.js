import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore.js";
const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://mora-social-app.onrender.com/api",
    withCredentials: true, // include cookies in requests
});

// attach access token to each request header
// interceptor is a function that runs before each request catch(). or then(). etc 
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})


export default api;