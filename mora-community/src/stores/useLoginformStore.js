import { create } from 'zustand'

export const useLoginformStore = create((set) => ({
    signUpAnim: false,
    signInAnim: false,
    isLoggedIn: false,
    isFlipped: false,
    setSignUpAnim: (value) => set({ signUpAnim: value }),
    setSignInAnim: (value) => set({ signInAnim: value }),
    setIsFlipped: (value) => set({ isFlipped: value }),
    toggleFlip: () => set((state) => ({ isFlipped: !state.isFlipped })),
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
}));