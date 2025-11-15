// Site Configuration
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'VyaptIX',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Pervasive Intelligence',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || process.env.NEXT_PUBLIC_DOMAIN || 'vyaptix.com',
  githubCliToken: process.env.GITHUB_CLI_OAUTH_TOKEN || process.env.GITHUB_PAT,
  location: process.env.NEXT_PUBLIC_LOCATION || '',
  phone: process.env.NEXT_PUBLIC_PHONE || '+917702661991',
  email: process.env.NEXT_PUBLIC_EMAIL || 'support@vyaptix.com',
  businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'all',
  enableThemeSwitcher: process.env.NEXT_PUBLIC_ENABLE_THEME_SWITCHER !== 'false',
  defaultTheme: process.env.NEXT_PUBLIC_DEFAULT_THEME || 'dark',
  version: process.env.NEXT_PUBLIC_APP_VERSION || `1.0.5-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
  copyrightYear: process.env.NEXT_PUBLIC_COPYRIGHT_YEAR || new Date().getFullYear().toString(),
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/vyaptix',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/vyaptix',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/vyaptix',
  }
};

// Theme Configuration
export const themeConfig = {
  light: {
    primary: '#2FDA37', // brand green
    secondary: '#25D02D', // darker green
    accent: '#20B628', // darkest green
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
  },
  dark: {
    primary: '#25D02D', // brand green for dark mode
    secondary: '#20B628', // darker green for dark mode
    accent: '#1A9A24', // darkest green for dark mode
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#ffffff', // Changed from #94a3b8 to white for all text white rule
  }
};

// Animation Configuration
export const animationConfig = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  }
};
