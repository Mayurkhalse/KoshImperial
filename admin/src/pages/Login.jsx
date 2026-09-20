import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@koshimperial.com');
  const [password, setPassword] = useState('AdminPassword123!');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      const user = res.data?.data?.user;
      const token = res.data?.data?.accessToken;

      if (user?.role !== 'admin') {
        setError('Access denied: Administrator privileges are required.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('ki_admin_token', token);
      localStorage.setItem('ki_admin_user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid administrator credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-evergreen-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-milkglass-100 border border-evergreen-700 p-8 md:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <div className="h-16 w-16 flex items-center justify-center overflow-hidden rounded-full border border-driftwood-400/80 bg-[#EDE8D8] shadow-md">
              <img
                src="/vulture-logo-circle.png"
                alt="Kosh Imperial Vulture Emblem"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <span className="font-serif text-3xl tracking-wider text-evergreen-700 font-normal block">
            KOSH IMPERIAL
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-mahogany-base font-semibold block">
            Atelier Administrative Portal
          </span>
        </div>

        {error && (
          <div className="p-3 bg-error/15 border border-error/30 text-xs text-error font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs text-charcoal focus:outline-none focus:border-mahogany-base font-sans"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs text-charcoal focus:outline-none focus:border-mahogany-base font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-evergreen-700 text-milkglass-base hover:bg-mahogany-base text-xs uppercase tracking-wider font-semibold transition-colors disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Verifying Credentials...' : 'Authenticate to Console'}
          </button>
        </form>

        <p className="text-[11px] text-center text-muted-brown">
          Default seed credentials: <code className="text-evergreen-700">admin@koshimperial.com</code> / <code className="text-evergreen-700">AdminPassword123!</code>
        </p>
      </div>
    </div>
  );
};
