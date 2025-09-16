# Zero Digital Website

A modern, responsive website for Zero Digital - AI-Powered Digital Transformation services.

## Features

- ✅ **Modern Design**: Clean, professional UI with Material Design principles
- ✅ **Theme Support**: Light and dark mode with runtime switching
- ✅ **Animations**: Smooth animations and transitions using Framer Motion
- ✅ **Responsive**: Mobile-first design that works on all devices
- ✅ **SEO Optimized**: Proper meta tags and structured data
- ✅ **Configurable**: Easy configuration via environment variables
- ✅ **Fast**: Built with Next.js 14 and optimized for performance

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom theme system
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **TypeScript**: Full type safety
- **Deployment**: Vercel (recommended)

## Configuration

The website is fully configurable via environment variables:

```env
# Domain Configuration
NEXT_PUBLIC_DOMAIN=zerodigital.ai
NEXT_PUBLIC_SITE_NAME=Zero Digital
NEXT_PUBLIC_SITE_TAGLINE=AI-Powered Digital Transformation

# Theme Configuration
NEXT_PUBLIC_DEFAULT_THEME=light
NEXT_PUBLIC_ENABLE_THEME_SWITCHER=true

# Business Configuration
NEXT_PUBLIC_BUSINESS_TYPE=all
NEXT_PUBLIC_LOCATION=Hyderabad, India
NEXT_PUBLIC_PHONE=+919876543210
NEXT_PUBLIC_EMAIL=info@zerodigital.ai

# Social Media
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/zerodigital
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/zerodigital
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/zerodigital
```

## Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Deployment

### Option 1: Vercel (Recommended - FREE)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy!

3. **Custom Domain**:
   - In Vercel dashboard, go to Settings > Domains
   - Add your domain (e.g., zerodigital.ai)
   - Update DNS records as instructed

### Option 2: Netlify (FREE)

1. **Build the project**:
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder
   - Or connect your GitHub repository

### Option 3: Hostinger (PAID - ₹99/month)

1. **Build the project**:
   ```bash
   npm run build
   npm run export
   ```

2. **Upload to Hostinger**:
   - Upload the `out` folder contents to your hosting
   - Configure domain and SSL

## Pages

- **Home**: Hero section, services overview, stats
- **Services**: Detailed service offerings with pricing
- **Portfolio**: Case studies and project showcase
- **Blog**: AI insights and digital marketing tips
- **About**: Company information and team
- **Contact**: Lead generation forms and contact info

## Customization

### Changing Colors
Edit `src/config/site.ts` to modify the theme colors:

```typescript
export const themeConfig = {
  light: {
    primary: '#2563eb', // Change this
    secondary: '#7c3aed', // Change this
    // ... other colors
  },
  dark: {
    primary: '#3b82f6', // Change this
    secondary: '#8b5cf6', // Change this
    // ... other colors
  }
};
```

### Adding New Pages
1. Create a new file in `src/app/[page-name]/page.tsx`
2. Add the route to the navigation in `src/components/Header.tsx`

### Modifying Content
- **Static content**: Edit the respective page files
- **Dynamic content**: Will be added with CMS integration

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Excellent
- **Mobile Performance**: Optimized
- **SEO**: Fully optimized

## Support

For questions or support, contact:
- Email: info@zerodigital.ai
- Phone: +919876543210

## License

© 2024 Zero Digital. All rights reserved.