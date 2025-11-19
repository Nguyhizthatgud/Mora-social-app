import { create } from 'zustand'
import { toast } from 'sonner'
import authService from '@/services/authService.js';

export const useAuthStore = create((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => set({ accessToken: null, user: null, loading: false }),

    signUp: async (username, password, email, firstName, lastName) => {
        set({ loading: true });
        try {
            //get api 
            await authService.signUp({ username, password, email, firstName, lastName });
            toast.success('Account created successfully!');
            return true; // Return success
        } catch (error) {
            toast.error(`Signup error, please try again`);
            console.error('Signup error:', error);
            return false; // Return failure
        } finally {
            set({ loading: false });
        }
    },
    setToken: (token) => set({ accessToken: token }),
    clearToken: () => set({ accessToken: null }),
    refresh: async () => {
        try {
            set({ loading: true });
            const accessToken = await authService.refresh();
            if (!accessToken) {
                // Don't error out - just silently fail (user needs to login again)
                console.log('No refresh token available - user needs to login');
                get().clearState();
                return;
            }
            set({ accessToken });
            const { user } = get();
            if (!user) {
                await get().fetchMe();
            }
        } catch (error) {
            // Silently clear state on refresh failure (backend might be sleeping)
            console.log('Token refresh failed (backend may be sleeping):', error.message);
            get().clearState();
        } finally {
            set({ loading: false });
        }
    },
    signIn: async (username, email, password) => {
        try {
            set({ loading: true });
            const data = await authService.signIn({ username, password });
            set({ accessToken: data.accessToken });
            await get().fetchMe();
            toast.success('Login successful! welcome back to MORA 😀');
        } catch (error) {
            const errorMsg = error.response?.status === 503
                ? 'Backend is waking up, please try again in 30 seconds'
                : error.response?.data?.message || 'Failed to login, please try again';
            toast.error(errorMsg);
            console.error('Login error:', error);
        } finally {
            set({ loading: false });
        }
    },
    signOut: async () => {
        try {
            get().clearState();
            set({ loading: true });
            await authService.signOut();
            set({ accessToken: null, user: null });
            toast.success('Logged out successfully, see you soon!');
        } catch (error) {
            toast.error(`Logout error, please try again`);
            console.error('Logout error:', error);
        } finally {
            set({ loading: false });
        }
    },
    fetchMe: async () => {
        try {
            set({ loading: true });
            const token = get().accessToken;
            const user = await authService.getMe(token);
            set({ user: user });
        } catch (error) {
            set({ user: null, accessToken: null });
            toast.error(`Failed to get user data, please try again`);
            console.error('Fetch user error:', error);
        }
        finally {
            set({ loading: false });
        }
    },
}));