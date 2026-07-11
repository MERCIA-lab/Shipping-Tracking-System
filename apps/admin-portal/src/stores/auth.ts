import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'store_owner' | 'manager';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // TODO: Replace with actual API call
        const mockUser: User = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'super_admin',
        };
        set({
          user: mockUser,
          token: 'mock-jwt-token',
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
