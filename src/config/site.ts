// Site Configuration
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Zero Digital',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'AI-Powered Digital Transformation',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || process.env.NEXT_PUBLIC_DOMAIN || 'zerodigital.ai',
  githubCliToken: process.env.GITHUB_CLI_OAUTH_TOKEN || process.env.GITHUB_PAT,
  location: process.env.NEXT_PUBLIC_LOCATION || 'Hyderabad, India',
  phone: process.env.NEXT_PUBLIC_PHONE || '+917702661991',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@zerodigital.ai',
  businessType: process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'all',
  enableThemeSwitcher: process.env.NEXT_PUBLIC_ENABLE_THEME_SWITCHER === 'true',
  defaultTheme: process.env.NEXT_PUBLIC_DEFAULT_THEME || 'light',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0-09172025',
  copyrightYear: process.env.NEXT_PUBLIC_COPYRIGHT_YEAR || new Date().getFullYear().toString(),
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/zerodigital',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/zerodigital',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/zerodigital',
  }
};

// Theme Configuration
export const themeConfig = {
  light: {
    primary: '#2563eb', // blue-600
    secondary: '#7c3aed', // violet-600
    accent: '#06b6d4', // cyan-500
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
  },
  dark: {
    primary: '#3b82f6', // blue-500
    secondary: '#8b5cf6', // violet-500
    accent: '#06b6d4', // cyan-500
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
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
