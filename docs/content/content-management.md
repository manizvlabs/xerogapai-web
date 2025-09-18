# Content Management Guide

## 🎯 **Safe Content Editing for Next.js Website**

This guide shows you how to edit your website content safely without breaking the Next.js build.

## 📁 **Content Structure**

All editable content is centralized in `src/config/content.ts`. This file contains:

- **Homepage content** - Hero section, stats, services, CTA
- **About page content** - Company info, values, team, stats  
- **Services page content** - Service descriptions, features, pricing
- **Portfolio content** - Project showcase, case studies
- **Blog content** - Blog posts, categories
- **Contact page content** - Contact form, company info

## 🔧 **How to Edit Content**

### **Method 1: Direct File Editing (Recommended)**

1. **Open the content file:**
   ```bash
   code src/config/content.ts
   ```

2. **Edit the content directly:**
   ```typescript
   // Example: Update homepage hero title
   homepage: {
     hero: {
       title: "Your New Title Here", // ← Edit this
       subtitle: "Your new subtitle...", // ← Edit this
     }
   }
   ```

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Commit and push:**
   ```bash
   git add src/config/content.ts
   git commit -m "content: Update homepage hero section"
   git push origin feature/v2
   ```

### **Method 2: Admin Interface (Future Enhancement)**

1. **Visit the admin page:**
   ```
   http://localhost:4010/admin/content
   ```

2. **Select a content section**
3. **Click "Edit" to modify content**
4. **Save changes**

## 📝 **Content Types You Can Edit**

### **Text Content**
- Titles, subtitles, descriptions
- Button text, form labels
- Blog post titles and excerpts
- Service descriptions

### **Data Arrays**
- Service lists
- Team members
- Portfolio projects
- Blog posts
- Statistics

### **Configuration**
- Contact information
- Social media links
- Pricing information
- Feature lists

## ⚠️ **Important Rules**

### **✅ DO:**
- ✅ Edit content in `src/config/content.ts` only
- ✅ Test changes locally with `npm run dev`
- ✅ Use proper JSON syntax
- ✅ Keep content structure consistent
- ✅ Commit changes to feature/v2 branch
- ✅ Create PRs to merge to main

### **❌ DON'T:**
- ❌ Edit content directly in component files
- ❌ Break JSON syntax
- ❌ Change data structure without updating components
- ❌ Push directly to main branch
- ❌ Skip local testing

## 🔍 **Content Validation**

The system includes content validation to prevent build errors:

```typescript
// Content validation function
export function validateContent(content: any): boolean {
  // Validates content structure
  // Prevents build errors
}
```

## 🚀 **Deployment Process**

1. **Edit content** in `src/config/content.ts`
2. **Test locally** with `npm run dev`
3. **Commit changes** to feature/v2 branch
4. **Create Pull Request** to main
5. **Merge PR** to deploy to production

## 📋 **Common Content Updates**

### **Update Company Information**
```typescript
// In src/config/content.ts
about: {
  team: [
    {
      name: 'Your Name',
      title: 'Your Title',
      description: 'Your description...',
    }
  ]
}
```

### **Add New Service**
```typescript
// In src/config/content.ts
services: {
  services: [
    // ... existing services
    {
      name: 'New Service',
      description: 'Service description...',
      features: ['Feature 1', 'Feature 2'],
      pricing: 'Starting from ₹X,XXX'
    }
  ]
}
```

### **Update Blog Posts**
```typescript
// In src/config/content.ts
blog: {
  posts: [
    // ... existing posts
    {
      title: 'New Blog Post',
      excerpt: 'Post excerpt...',
      date: 'December 20, 2024',
      category: 'AI & Automation',
      readTime: '5 min read',
      slug: 'new-blog-post-slug'
    }
  ]
}
```

## 🛠️ **Troubleshooting**

### **Build Errors**
- Check JSON syntax in content.ts
- Ensure all required fields are present
- Run `npm run build` to test locally

### **Content Not Updating**
- Clear browser cache
- Restart development server
- Check if content is properly imported

### **TypeScript Errors**
- Ensure content structure matches expected types
- Check for missing required fields
- Validate JSON syntax

## 📚 **Advanced Content Management**

### **Environment Variables**
Some content can be controlled via environment variables:

```bash
# .env.local
NEXT_PUBLIC_SITE_NAME="Your Company Name"
NEXT_PUBLIC_SITE_TAGLINE="Your Tagline"
NEXT_PUBLIC_LOCATION="Your Location"
```

### **Dynamic Content**
For more advanced content management, consider:

1. **Headless CMS** (Strapi, Contentful)
2. **Database integration** (MongoDB, PostgreSQL)
3. **API-based content** (REST, GraphQL)

## 🎉 **Benefits of This Approach**

- ✅ **Safe editing** - No risk of breaking the build
- ✅ **Version control** - All changes are tracked
- ✅ **Easy rollback** - Can revert changes easily
- ✅ **Team collaboration** - Multiple people can edit safely
- ✅ **Build protection** - Content validation prevents errors
- ✅ **Performance** - No external dependencies

---

**Remember**: Always test locally before pushing changes! 🚀
