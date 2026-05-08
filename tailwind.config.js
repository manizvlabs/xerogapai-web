/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Design system brand aliases — single source of truth
        brand: {
          blue:      '#1A52E0',
          'blue-dark': '#0E30A0',
          cyan:      '#06CEFF',
          'cyan-dim': '#00BAE8',
        },
        // Dark background palette (hero, footer, dark sections)
        space: {
          black: '#050D1A',
          navy:  '#0A1628',
          dark:  '#141E30',
        },
        // Logo-derived electric blue
        primary: {
          50:  '#EEF4FF',
          100: '#DDE9FF',
          200: '#C4D6FF',
          300: '#8FB3FF',
          400: '#4A7FF5',
          500: '#1A52E0',
          600: '#1240C4',
          700: '#0E30A0',
          800: '#0A2280',
          900: '#071660',
        },
        // Logo-derived electric cyan
        secondary: {
          50:  '#E0FAFE',
          100: '#B8F3FC',
          200: '#78E9FA',
          300: '#38D9F5',
          400: '#06CEFF',
          500: '#00BAE8',
          600: '#0097C4',
          700: '#0078A0',
          800: '#005880',
          900: '#003A55',
        },
        success: {
          50: '#E6F9F5',
          100: '#CCF4EB',
          200: '#99E9D7',
          300: '#66DEC3',
          400: '#33D3AF',
          500: '#00B894',
          600: '#009376',
          700: '#006E59',
          800: '#00493B',
          900: '#00251E',
        },
        warning: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFB92C',
          600: '#CC9423',
          700: '#996F1A',
          800: '#664A12',
          900: '#332509',
        },
        error: {
          50: '#FFEFEF',
          100: '#FFDFDF',
          200: '#FFBFBF',
          300: '#FF9F9F',
          400: '#FF7F7F',
          500: '#FF6B6B',
          600: '#CC5656',
          700: '#994040',
          800: '#662B2B',
          900: '#331515',
        },
        info: {
          50: '#E6F5FC',
          100: '#CCEBF9',
          200: '#99D7F3',
          300: '#66C3ED',
          400: '#33AFE7',
          500: '#0099E0',
          600: '#007AB3',
          700: '#005C86',
          800: '#003D5A',
          900: '#001F2D',
        },
        background: {
          DEFAULT: '#F8F9FA',
          alt: '#F0F2F5',
          white: '#FFFFFF',
        },
        text: {
          DEFAULT: '#2C3E50',
          secondary: '#6C757D',
          tertiary: '#99A3AF',
          muted: '#6C757D',
          light: '#99A3AF',
        },
        // accent = secondary cyan — used by Button secondary variant and Section dark
        accent: {
          DEFAULT: '#00BAE8',
          light: '#06CEFF',
          dark: '#0097C4',
        },
        border: {
          light: '#E8ECEF',
          medium: '#D0D5DD',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      zIndex: {
        'nav':     '50',
        'dropdown': '60',
        'modal':   '70',
        'toast':   '80',
        'cookie':  '90',
      },
      borderRadius: {
        'sm':  '6px',
        'md':  '8px',
        'lg':  '12px',  // buttons
        'xl':  '16px',  // light-bg cards
        '2xl': '24px',  // dark/glass cards
        '3xl': '32px',  // hero panels
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'large': '0 8px 24px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'fade-in':        'fadeIn 0.5s ease-out',
        'slide-up':       'slideUp 0.5s ease-out',
        'slide-down':     'slideDown 0.3s ease-out',
        'float':          'float 8s ease-in-out infinite',
        'float-slow':     'float 12s ease-in-out infinite',
        'scroll-reveal':  'scrollReveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-dot':      'pulseDot 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'glow-pulse':     'glowPulse 4s ease-in-out infinite',
        // v2 additions
        'counter-up':     'counterUp 1.2s ease-out forwards',
        'shimmer':        'shimmer 2.5s linear infinite',
        'slide-in-left':  'slideInLeft 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':       'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'border-glow':    'borderGlow 3s ease-in-out infinite',
        'accordion-down': 'accordionDown 0.2s ease-out',
        'accordion-up':   'accordionUp 0.2s ease-out',
        'marquee':        'marquee 25s linear infinite',
        'marquee-reverse':'marquee 30s linear infinite reverse',
        'rotate-slow':    'rotateSlow 30s linear infinite',
        'shake':          'shake 0.4s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        scrollReveal: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.2' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        // v2 keyframes
        counterUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        borderGlow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(6,206,255,0)' },
          '50%':      { boxShadow: '0 0 24px rgba(6,206,255,0.4)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rotateSlow: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-6px)' },
          '40%':      { transform: 'translateX(6px)' },
          '60%':      { transform: 'translateX(-4px)' },
          '80%':      { transform: 'translateX(4px)' },
        },
        accordionDown: {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        accordionUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
    },
  },
  plugins: [],
};
