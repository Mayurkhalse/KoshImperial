import React from 'react';
import { X, User, ShoppingBag } from 'lucide-react';
import { NavLinks } from './NavLinks.jsx';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      <div className="fixed inset-0 bg-evergreen-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-4/5 max-w-xs bg-milkglass-base h-full shadow-2xl p-6 flex flex-col justify-between z-10">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-driftwood-300">
            <span className="font-serif text-xl tracking-wider text-evergreen-700 font-medium">
              KOSH IMPERIAL
            </span>
            <button type="button" onClick={onClose} className="p-1 text-evergreen-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-8">
            <NavLinks className="flex-col !items-start !gap-6" onItemClick={onClose} />
          </div>
        </div>

        <div className="pt-6 border-t border-driftwood-300 space-y-3">
          {isAuthenticated ? (
            <Link
              to="/account/dashboard"
              onClick={onClose}
              className="flex items-center gap-3 text-xs uppercase tracking-wider text-evergreen-700 font-medium py-2"
            >
              <User className="w-4 h-4 text-mahogany-base" />
              <span>{user?.name || 'My Account'}</span>
            </Link>
          ) : (
            <Link
              to="/account/login"
              onClick={onClose}
              className="flex items-center gap-3 text-xs uppercase tracking-wider text-evergreen-700 font-medium py-2"
            >
              <User className="w-4 h-4 text-mahogany-base" />
              <span>Sign In / Register</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
