import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button.jsx';
import { Home, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="py-32 bg-milkglass-base min-h-[70vh] flex items-center justify-center text-center">
      <div className="max-w-md mx-auto px-4 space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-mahogany-base">
          404 ERROR · NOT FOUND
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-evergreen-700 font-normal">
          Piece Not Found
        </h1>
        <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
          The page or archival piece you are searching for does not exist or has been relocated.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary" size="md" className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>Explore Shop</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
