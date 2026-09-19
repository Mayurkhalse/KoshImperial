import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileEdit,
  Tag,
  BarChart3,
  ExternalLink,
} from 'lucide-react';

export const Sidebar = () => {
  const links = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Products', href: '/products', icon: Package },
    { label: 'Orders', href: '/orders', icon: ShoppingBag },
    { label: 'Users', href: '/users', icon: Users },
    { label: 'Content (CMS)', href: '/content', icon: FileEdit },
    { label: 'Coupons', href: '/coupons', icon: Tag },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-evergreen-900 text-milkglass-base flex flex-col justify-between shrink-0 min-h-screen border-r border-evergreen-700">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-evergreen-700">
          <span className="font-serif text-xl tracking-wider text-milkglass-base font-normal block">
            KOSH IMPERIAL
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-evergreen-200 block mt-0.5">
            Atelier Administration
          </span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-medium transition-all ${
                    isActive
                      ? 'bg-mahogany-base text-milkglass-base font-semibold shadow-sm'
                      : 'text-milkglass-base/70 hover:bg-evergreen-700 hover:text-milkglass-base'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Live Storefront Link */}
      <div className="p-4 border-t border-evergreen-700">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-3 bg-evergreen-700/50 hover:bg-evergreen-700 text-xs text-milkglass-base transition-colors"
        >
          <span>Live Storefront</span>
          <ExternalLink className="w-3.5 h-3.5 text-evergreen-200" />
        </a>
      </div>
    </aside>
  );
};
