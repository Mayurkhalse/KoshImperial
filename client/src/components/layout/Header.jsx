import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, ShoppingBag } from 'lucide-react';
import { NavLinks } from './NavLinks.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import { IconButton } from '../common/IconButton.jsx';
import { useCartStore } from '../../store/cartStore.js';
import { useAuthStore } from '../../store/authStore.js';

export const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { openDrawer, getItemCount } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const itemCount = getItemCount();

  return (
    <>
      <header className="sticky top-0 z-40 bg-milkglass-base/95 backdrop-blur-md border-b border-driftwood-300 transition-colors duration-200">
        <div className="max-w-container mx-auto px-3.5 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <IconButton
              icon={Menu}
              label="Open navigation menu"
              onClick={() => setIsMobileOpen(true)}
            />
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="group flex flex-col">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-wider text-evergreen-700 font-normal group-hover:text-mahogany-base transition-colors">
                KOSH IMPERIAL
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-brown -mt-0.5 sm:-mt-1 font-sans font-medium">
                Luxury Eco-Craft
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center">
            <NavLinks />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            <Link to={isAuthenticated ? '/account/dashboard' : '/account/login'}>
              <IconButton
                icon={User}
                label={isAuthenticated ? 'Account' : 'Sign in'}
                className="hidden sm:inline-flex"
              />
            </Link>

            <IconButton
              icon={ShoppingBag}
              label="Shopping Cart"
              onClick={openDrawer}
              badge={itemCount}
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
};
