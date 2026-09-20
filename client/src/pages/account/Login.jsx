import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Input } from '../../components/common/Input.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Breadcrumbs } from '../../components/common/Breadcrumbs.jsx';

export const Login = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleQuickFill = (role) => {
    if (role === 'admin') {
      setEmail('admin@koshimperial.com');
      setPassword('AdminPassword123!');
    } else {
      setEmail('customer@koshimperial.com');
      setPassword('CustomerPassword123!');
    }
  };

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-4 mb-4">
        <Breadcrumbs items={[{ label: 'Sign In' }]} />
      </div>
      <div className="max-w-md w-full mx-4 bg-milkglass-100 border border-driftwood-300 p-8 md:p-10 shadow-luxury space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <div className="h-16 w-16 flex items-center justify-center overflow-hidden rounded-full border border-driftwood-400/60 bg-driftwood-200/50 shadow-sm">
              <img
                src="/vulture.logo.of.kosh.png"
                alt="Kosh Imperial Vulture Emblem"
                className="h-full w-full object-contain p-1 mix-blend-multiply"
              />
            </div>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-mahogany-base">
            WELCOME BACK
          </p>
          <h1 className="font-serif text-3xl text-evergreen-700 font-normal">
            Sign in to your atelier account
          </h1>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="p-4 bg-milkglass-300 border border-driftwood-300 space-y-2">
          <p className="text-[11px] font-semibold text-evergreen-700 uppercase tracking-wider text-center">
            One-Click Test Login Credentials
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('customer')}
              className="py-1.5 px-2 bg-milkglass-100 hover:bg-driftwood-300 text-xs text-charcoal border border-driftwood-base transition-colors"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="py-1.5 px-2 bg-milkglass-100 hover:bg-driftwood-300 text-xs text-charcoal border border-driftwood-base transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aarav@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" variant="primary" size="lg" isLoading={isLoggingIn} className="w-full">
            Sign In
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-muted-brown">
          Don't have an account?{' '}
          <Link to="/account/register" className="text-mahogany-base font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
