import { create } from 'zustand';

export type User = {
  email: string;
  password: string;
  setUserData: (email: string, password: string) => void;
};

export const useUser = create<User>((set) => ({
  email: '',
  password: '',
  setUserData: (email: string, password: string) => set({ email, password }),
}));
