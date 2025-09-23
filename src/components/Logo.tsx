'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { siteConfig } from '@/config/site';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text' | 'hero' | 'footer' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  priority?: boolean;
  alt?: string;
  responsive?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const Logo = ({
  variant = 'full',
  size = 'md',
  className = '',
  priority = false,
  alt,
  responsive = false,
  onLoad,
  onError
}: LogoProps) => {
  const { theme } = useTheme();

  // Size configurations with responsive variants
  const sizeConfig = {
    sm: { height: 32, width: 'auto', responsiveHeight: { sm: 24, md: 28, lg: 32 } },
    md: { height: 40, width: 'auto', responsiveHeight: { sm: 32, md: 36, lg: 40 } },
    lg: { height: 80, width: 'auto', responsiveHeight: { sm: 56, md: 64, lg: 80 } },
    xl: { height: 120, width: 'auto', responsiveHeight: { sm: 80, md: 96, lg: 120 } },
  };

  // Logo variant mappings with theme awareness and fallbacks
  const getLogoSrc = () => {
    const isDark = theme === 'dark';

    switch (variant) {
      case 'full':
        return isDark ? '/logo-dark.png' : '/logo-header.png';
      case 'icon':
        return isDark ? '/logo-dark.png' : '/logo-header-mobile.png';
      case 'hero':
        return '/logo-hero.png';
      case 'footer':
        return isDark ? '/logo-dark.png' : '/logo-footer.png';
      case 'dark':
        return '/logo-dark.png';
      case 'text':
        return isDark ? '/logo-dark.png' : '/logo-header.png';
      default:
        return '/logo-fallback.png';
    }
  };

  const logoSrc = getLogoSrc();
  const config = sizeConfig[size];
  const altText = alt || `${siteConfig.name} Logo`;

  // Responsive height classes
  const getResponsiveClasses = () => {
    if (!responsive) return '';

    const heights = config.responsiveHeight;
    return `h-[${heights.sm}px] sm:h-[${heights.md}px] lg:h-[${heights.lg}px]`;
  };

  return (
    <Image
      src={logoSrc}
      alt={altText}
      width={config.width === 'auto' ? 400 : config.width}
      height={responsive ? undefined : config.height}
      className={`${config.width === 'auto' ? 'w-auto' : 'w-full'} ${responsive ? getResponsiveClasses() : ''} ${className}`}
      priority={priority}
      style={responsive ? {} : { height: `${config.height}px`, width: config.width === 'auto' ? 'auto' : `${config.width}px` }}
      onLoad={onLoad}
      onError={(e) => {
        // Fallback to default logo on error
        const target = e.target as HTMLImageElement;
        if (target.src !== '/logo-fallback.png') {
          target.src = '/logo-fallback.png';
        }
        onError?.();
      }}
    />
  );
};

export default Logo;
