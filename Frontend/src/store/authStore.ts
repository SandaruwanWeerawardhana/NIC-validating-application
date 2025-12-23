import { create } from "zustand";

interface User {
  username: string;
  name?: string;
  email?: string;
  role: "USER";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setAuthError: (error: string | null) => void;
}

const API_BASE_URL = "http://localhost:8080/api/nic/auth";
const AUTH_COOKIE_NAME = "nic_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; 

const setCookie = (name: string, value: string, maxAgeSeconds: number) => {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}`;
};

const getCookie = (name: string): string | null => {
  const escapedName = name.replaceAll(/([.$?*|{}()[\]\\+^])/g, String.raw`\$1`);
  const pattern = new RegExp(String.raw`(?:^|; )${escapedName}=([^;]*)`);
  const result = pattern.exec(document.cookie);
  return result ? decodeURIComponent(result[1]) : null;
};

const clearCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

export const getAuthToken = (): string | null => {
  return getCookie(AUTH_COOKIE_NAME);
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const getInitialAuthState = () => {
  const token = getAuthToken();
  return {
    user: null,
    token: token,
    isAuthenticated: !!token,
    authLoading: false,
    authError: null,
  };
};

export const useAuthStore = create<AuthState>((set) => {
  const initialState = getInitialAuthState();

  return {
  user: null,
  token: initialState.token,
  isAuthenticated: initialState.isAuthenticated,
  authLoading: false,
  authError: null,

  setAuthError: (authError) => set({ authError }),

  login: async (username: string, password: string) => {
    set({ authLoading: true, authError: null });
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: Login failed`
        );
      }

      const data = await response.json();
      const token = data.token || data.accessToken;

      if (!token) {
        throw new Error("No token returned from server");
      }

      setCookie(AUTH_COOKIE_NAME, token, COOKIE_MAX_AGE);

      set({
        token,
        user: {
          username: data.username || username,
          name: data.name,
          email: data.email || username,
          role: "USER",
        },
        isAuthenticated: true,
        authLoading: false,
      });

      return true;
    } catch (err) {
      const authError = err instanceof Error ? err.message : "Login failed";
      set({ authError, authLoading: false, isAuthenticated: false, token: null });
      return false;
    }
  },

  
  register: async (name: string, username: string, password: string) => {
    set({ authLoading: true, authError: null });
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: Registration failed`
        );
      }

      await response.json();

      set({
        authLoading: false,
      });

      return true;
    } catch (err) {
      const authError = err instanceof Error ? err.message : "Registration failed";
      set({ authError, authLoading: false });
      return false;
    }
  },

  logout: () => {
    clearCookie(AUTH_COOKIE_NAME);
    set({ user: null, token: null, isAuthenticated: false });
  },
  };
});
