'use client';

import { useState } from 'react';
import Logo from './Logo';

interface LogoLoaderProps {
  variant?: 'full' | 'icon' | 'text' | 'hero' | 'footer' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  priority?: boolean;
  alt?: string;
  showLoader?: boolean;
}

const LogoLoader = ({
  variant = 'full',
  size = 'md',
  className = '',
  priority = false,
  alt,
  showLoader = true
}: LogoLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {showLoader && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-full w-full"></div>
        </div>
      )}
      <Logo
        variant={variant}
        size={size}
        priority={priority}
        alt={alt}
        className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
};

export default LogoLoader;
