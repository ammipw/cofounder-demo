import { create } from "zustand";

export type User = {
  name: string;
}

export const useUser = create((set) => ({
  user: null,
  setUser: (newUser: User) => set({ user: newUser }),
  clearUser: () => set({ user: null }),
}));