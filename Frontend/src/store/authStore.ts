import { create } from "zustand";

interface User {
  username: string;
  name?: string;
  email?: string;
  role: "USER";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  registerViaApi: (
    name: string,
    username: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  setError: (error: string | null) => void;
}
const API_BASE_URL = 'http://localhost:8080/api/nic/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (username, password) => {
    if (username && password) {
      set({
        user: { username, role: "USER" },
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },

  register: async (name, email, password) => {
    if (name && email && password) {
      set({
        user: { username: email, name, email, role: "USER" },
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },

  registerViaApi: async (name: string, username: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: Registration failed`
        );
      }

      const data = await response.json();

      set({
        user: {
          username: data.username || username,
          name: data.name || name,
          email: data.email || username,
          role: data.role || "user",
        },
        isAuthenticated: true,
        loading: false,
      });

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  setError: (error) => set({ error }),
}));
