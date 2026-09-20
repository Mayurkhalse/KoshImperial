import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Input } from '../../components/common/Input.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Breadcrumbs } from '../../components/common/Breadcrumbs.jsx';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { register, isRegistering } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, phone, password });
  };

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-4 mb-4">
        <Breadcrumbs items={[{ label: 'Register' }]} />
      </div>
      <div className="max-w-md w-full mx-4 bg-milkglass-100 border border-driftwood-300 p-8 md:p-10 shadow-luxury space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <div className="h-16 w-16 flex items-center justify-center overflow-hidden rounded-full border border-driftwood-400/80 bg-[#EDE8D8] shadow-sm">
              <img
                src="/vulture-logo-circle.png"
                alt="Kosh Imperial Vulture Emblem"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-mahogany-base">
            BECOME A PATRON
          </p>
          <h1 className="font-serif text-3xl text-evergreen-700 font-normal">
            Create your account
          </h1>
          <p className="text-xs text-muted-brown">
            Track your conscious orders and manage your delivery addresses.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aarav Sharma"
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aarav@example.com"
            required
          />

          <Input
            label="Phone Number (Optional)"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            required
          />

          <Button type="submit" variant="primary" size="lg" isLoading={isRegistering} className="w-full">
            Register Account
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-muted-brown">
          Already have an account?{' '}
          <Link to="/account/login" className="text-mahogany-base font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
