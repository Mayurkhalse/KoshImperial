import React from 'react';
import { LogOut, User } from 'lucide-react';

export const Topbar = ({ onLogout }) => {
  const adminUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('ki_admin_user') || '{}');
    } catch {
      return {};
    }
  })();

  return (
    <header className="h-16 bg-milkglass-100 border-b border-driftwood-300 px-8 flex items-center justify-between">
      <div>
        <span className="text-xs uppercase tracking-widest text-muted-brown font-semibold">
          Console / Active Session
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs font-medium text-evergreen-700">
          <div className="w-7 h-7 bg-evergreen-700 text-milkglass-base rounded-full flex items-center justify-center font-serif text-sm">
            {adminUser.name?.[0] || 'A'}
          </div>
          <span>{adminUser.name || 'Admin'}</span>
          <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-driftwood-300 text-evergreen-700 font-semibold">
            {adminUser.role || 'Admin'}
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-error hover:text-error/80 font-semibold transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
};
