import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button.jsx';

export const CTAButton = ({ to, children, variant = 'primary', size = 'md', className = '', ...props }) => {
  if (to) {
    return (
      <Link to={to} className="inline-block">
        <Button variant={variant} size={size} className={className} {...props}>
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button variant={variant} size={size} className={className} {...props}>
      {children}
    </Button>
  );
};
