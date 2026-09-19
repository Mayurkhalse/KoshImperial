import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavLinks = ({ className = '', onItemClick }) => {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Our Story', href: '/story' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Why Kosh', href: '/why-kosh' },
    { label: 'Impact', href: '/impact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`flex items-center gap-4 lg:gap-5 xl:gap-7 ${className}`}>
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          end={link.href === '/'}
          onClick={onItemClick}
          className={({ isActive }) =>
            `text-[11px] xl:text-xs uppercase tracking-widest font-medium transition-colors duration-200 py-1.5 relative whitespace-nowrap ${
              isActive
                ? 'text-mahogany-base font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-mahogany-base'
                : 'text-evergreen-700 hover:text-mahogany-base hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[1px] hover:after:bg-driftwood-base'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
