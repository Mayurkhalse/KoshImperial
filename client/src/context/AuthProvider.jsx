import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../store/authStore.js';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { setAuth, logout, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      authService
        .getMe()
        .then((res) => {
          if (res.data) {
            setAuth(res.data, token);
          }
        })
        .catch(() => {
          logout();
        });
    }
  }, [token, setAuth, logout]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
