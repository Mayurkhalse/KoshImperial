import { create } from 'zustand';

const initialUser = (() => {
  try {
    const raw = localStorage.getItem('ki_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

export const useAuthStore = create((set) => ({
  user: initialUser,
  token: localStorage.getItem('ki_access_token') || null,
  isAuthenticated: Boolean(localStorage.getItem('ki_access_token')),

  setAuth: (user, token) => {
    localStorage.setItem('ki_access_token', token);
    localStorage.setItem('ki_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('ki_access_token');
    localStorage.removeItem('ki_user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
