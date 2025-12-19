import { create } from 'zustand';

interface User {
  username: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (username, password) => {
    // Mock login logic
    if (username && password) {
      set({ 
        user: { username, role: 'user' }, 
        isAuthenticated: true 
      });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
