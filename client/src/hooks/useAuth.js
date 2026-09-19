import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';
import { useAuthStore } from '../store/authStore.js';
import { useUIStore } from '../store/uiStore.js';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();
  const { addToast } = useUIStore();

  const loginMutation = useMutation({
    mutationFn: (creds) => authService.login(creds),
    onSuccess: (res) => {
      setAuth(res.data.user, res.data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      addToast(`Welcome back, ${res.data.user.name}`, 'success');
      navigate('/');
    },
    onError: (err) => {
      addToast(err.response?.data?.message || 'Login failed', 'error');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (res) => {
      setAuth(res.data.user, res.data.accessToken);
      addToast('Welcome to Kosh Imperial!', 'success');
      navigate('/');
    },
    onError: (err) => {
      addToast(err.response?.data?.message || 'Registration failed', 'error');
    },
  });

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {}
    logout();
    queryClient.clear();
    addToast('You have been signed out', 'info');
    navigate('/');
  };

  return {
    user,
    token,
    isAuthenticated,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout: handleLogout,
  };
};
