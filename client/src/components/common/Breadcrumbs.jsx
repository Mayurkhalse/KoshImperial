import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [], className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-2 text-xs uppercase tracking-widest text-muted-brown ${className}`}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 hover:text-evergreen-700 transition-colors py-1 group font-medium"
      >
        <Home className="w-3.5 h-3.5 text-mahogany-base transition-transform group-hover:-translate-y-0.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-driftwood-600 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-evergreen-700 font-semibold truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-evergreen-700 transition-colors font-medium"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
