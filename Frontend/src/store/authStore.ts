import { create } from 'zustand';

interface User {
  username: string; // Keeping username for legacy/simple login compatibility
  name?: string;
  email?: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
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
  register: async (name, email, password) => {
      // Mock register logic
      if(name && email && password) {
          set({
              user: { username: email, name, email, role: 'user'}, // Use email as username for this flow
              isAuthenticated: true
          });
          return true;
      }
      return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
