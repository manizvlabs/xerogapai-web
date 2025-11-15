# XeroGap AI - AI-Powered Digital Transformation

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/manizvlabs/xerogapai-web)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://www.vyaptix.ai/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue)](https://tailwindcss.com/)
[![Version](https://img.shields.io/badge/version-1.0.5-blue)](https://github.com/manizvlabs/xerogapai-web/releases)

**🌐 Live Website:** [https://www.vyaptix.ai/](https://www.vyaptix.ai/)

Transform your business with cutting-edge AI automation, custom mobile apps, and digital marketing solutions. Built for Hyderabad businesses and beyond.

## 📋 Changelog

For a complete list of changes, features, and bug fixes, see the [CHANGELOG.md](CHANGELOG.md) file.

## 🌟 Features

- **AI Content Automation**: Automated LinkedIn, Instagram, and blog content generation
- **Mobile App Development**: Custom iOS and Android applications
- **Digital Transformation**: Complete business process automation
- **AI Agent Development**: Custom AI solutions for specific business needs
- **Modern UI/UX**: Responsive design with light/dark theme support
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Contact Form**: Functional contact form with email integration
- **Analytics**: Google Analytics integration
- **Performance**: Optimized for fast loading and SEO

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### 🌐 Live Deployment

The website is automatically deployed to Vercel on every push to the `main` branch:

- **Production URL:** [https://www.vyaptix.ai/](https://www.vyaptix.ai/)
- **CI/CD:** GitHub Actions with automated testing and deployment
- **Performance:** Optimized with Vercel's CDN and edge functions
- **Security:** HTTPS enabled with security headers

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manizvlabs/xerogapai-web.git
   cd xerogapai-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Site Configuration
   NEXT_PUBLIC_SITE_NAME="XeroGap AI"
   NEXT_PUBLIC_SITE_TAGLINE="AI-Powered Digital Transformation"
   NEXT_PUBLIC_DOMAIN="www.vyaptix.ai"
   NEXT_PUBLIC_LOCATION=""
   NEXT_PUBLIC_PHONE="+919876543210"
   NEXT_PUBLIC_EMAIL="support@www.vyaptix.ai"

   # Theme Configuration
   NEXT_PUBLIC_ENABLE_THEME_SWITCHER="true"
   NEXT_PUBLIC_DEFAULT_THEME="light"

   # Social Links
   NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/company/xerogapai"
   NEXT_PUBLIC_TWITTER_URL="https://twitter.com/xerogapai"
   NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/xerogapai"

   # Analytics (Optional)
   NEXT_PUBLIC_GA_MEASUREMENT_ID="GA-XXXXXXXXXX"

   # Email Service (Optional - for production)
   EMAIL_SERVICE_API_KEY="your_email_service_api_key"
   CONTACT_EMAIL="support@www.vyaptix.ai"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
xerogapai-web/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # Contact form API endpoint
│   │   ├── layout.tsx                # Root layout with metadata
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Global styles and animations
│   │   ├── about/
│   │   │   └── page.tsx              # About page
│   │   ├── services/
│   │   │   └── page.tsx              # Services page
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact page with form
│   │   ├── portfolio/
│   │   │   └── page.tsx              # Portfolio page
│   │   └── blog/
│   │       └── page.tsx              # Blog page
│   ├── components/
│   │   ├── Header.tsx                # Navigation header
│   │   ├── Footer.tsx                # Site footer
│   │   ├── ThemeSwitcher.tsx         # Dark/light theme toggle
│   │   ├── StructuredData.tsx        # SEO structured data
│   │   └── GoogleAnalytics.tsx       # Analytics integration
│   ├── contexts/
│   │   └── ThemeContext.tsx          # Theme management
│   └── config/
│       └── site.ts                   # Site configuration
├── public/
│   ├── logo.png                      # Site logo
│   └── favicon.ico                   # Favicon
├── tailwind.config.ts                # Tailwind configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🎨 Customization

### Theme Configuration

The site supports both light and dark themes. You can customize the colors in `src/config/site.ts`:

```typescript
export const themeConfig = {
  light: {
    primary: '#2563eb',    // Blue-600
    secondary: '#7c3aed',  // Violet-600
    accent: '#06b6d4',    // Cyan-500
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
  },
  dark: {
    primary: '#3b82f6',    // Blue-500
    secondary: '#8b5cf6',  // Violet-500
    accent: '#06b6d4',    // Cyan-500
    background: '#0f172a', // Slate-900
    surface: '#1e293b',   // Slate-800
    text: '#f1f5f9',      // Slate-100
    textSecondary: '#94a3b8', // Slate-400
  }
};
```

### Content Updates

All content is centralized in `src/config/site.ts`. Update the site configuration to modify:

- Site name and tagline
- Contact information
- Social media links
- Business type and location

### Services

Services are defined in the homepage (`src/app/page.tsx`). Update the `services` array to modify:

- Service names and descriptions
- Service icons (from Heroicons)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository**
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel

2. **Configure environment variables**
   - Add all environment variables from `.env.local` to Vercel's dashboard

3. **Deploy**
   - Vercel will automatically build and deploy your site
   - Your site will be available at `your-project-name.vercel.app`

4. **Custom domain (optional)**
   - Add your custom domain in Vercel's dashboard
   - Configure DNS settings as instructed

### Other Platforms

The site can also be deployed to:
- **Netlify**: Connect your GitHub repo and deploy automatically
- **AWS Amplify**: Full CI/CD pipeline with AWS services
- **DigitalOcean**: Manual deployment with App Platform

## 📧 Email Integration

The contact form is currently set up for logging submissions. For production email sending, integrate with:

### Option 1: SendGrid
```bash
npm install @sendgrid/mail
```

### Option 2: Resend
```bash
npm install resend
```

### Option 3: NodeMailer with SMTP
```bash
npm install nodemailer
```

Update the contact API route (`src/app/api/contact/route.ts`) with your preferred email service.

## 🔍 SEO & Analytics

### Google Analytics
1. Create a GA4 property at [Google Analytics](https://analytics.google.com)
2. Get your Measurement ID (format: GA-XXXXXXXXXX)
3. Add it to your environment variables:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID="GA-XXXXXXXXXX"
   ```

### Search Console
1. Add your site to [Google Search Console](https://search.google.com/search-console)
2. Verify ownership and submit your sitemap
3. Monitor search performance and indexing

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Code Quality
npm run format       # Format code with Prettier
npm run test         # Run tests (if configured)
```

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React and Next.js best practices
- **Prettier**: Code formatting with consistent style
- **Tailwind**: Utility-first CSS framework

## 📱 Responsive Design

The site is fully responsive and optimized for:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎭 Theme System

### Features
- Light and dark mode support
- System preference detection
- Local storage persistence
- Smooth transitions
- Accessible theme switcher

### Usage
The theme switcher is located in the header. Users can toggle between:
- Light mode
- Dark mode
- System preference (follows OS setting)

## 📊 Performance

### Optimization Features
- **Next.js 15**: Latest version with Turbopack
- **Image optimization**: Automatic image optimization
- **Code splitting**: Automatic route-based code splitting
- **CSS optimization**: Tailwind CSS purging
- **Font optimization**: Google Fonts preloading
- **SEO**: Meta tags and structured data

### Performance Metrics
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: All metrics optimized
- **Bundle Size**: Optimized with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@www.vyaptix.ai
- **Phone**: 

## 🙏 Acknowledgments

- **Next.js** - The React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Vercel** - Deployment platform
- **Google Analytics** - Analytics and tracking

---

Transform your business with AI-powered digital solutions. 🚀