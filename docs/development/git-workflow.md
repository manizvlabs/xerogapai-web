# Git Workflow for Zero Digital Website

## 🚨 **CRITICAL RULES - ALWAYS FOLLOW**

### ❌ **NEVER DO:**
- ❌ **Never checkout main branch** - This triggers unnecessary Vercel builds
- ❌ **Never push directly to main** - This bypasses code review and triggers builds
- ❌ **Never work on main branch** - Always use feature branches

### ✅ **ALWAYS DO:**
- ✅ **Always work on feature/v2 branch** - This is the primary development branch
- ✅ **Always create Pull Requests** - All changes to main must go through PRs
- ✅ **Always test locally first** - Use `npm run dev` before creating PRs

## 🔄 **Current Workflow**

### **Primary Development Branch: `feature/v2`**
- This is where ALL development work happens
- All new features, fixes, and improvements go here
- This branch is protected from triggering Vercel builds

### **Production Branch: `main`**
- This branch is **READ-ONLY** for development
- Only receives changes via Pull Requests
- Triggers Vercel builds only when PRs are merged
- Always keep this branch stable and deployable

## 📋 **Development Process**

### 1. **Start Development**
```bash
# Make sure you're on feature/v2 (current branch)
git status

# If not on feature/v2, switch to it
git checkout feature/v2
```

### 2. **Make Changes**
```bash
# Make your changes to the code
# Test locally with npm run dev

# Stage and commit changes
git add .
git commit -m "feat: Add new feature description"
```

### 3. **Push Changes**
```bash
# Push to feature/v2 branch
git push origin feature/v2
```

### 4. **Create Pull Request**
- Go to GitHub: https://github.com/manizvlabs/zero-digital-website
- Click "Compare & pull request" for feature/v2
- Add description of changes
- Request review if needed
- Merge when ready

### 5. **After PR is Merged**
```bash
# Pull latest changes to feature/v2
git checkout feature/v2
git pull origin main
```

## 🛡️ **Branch Protection Rules**

### **feature/v2 Branch:**
- ✅ Development branch
- ✅ Can be pushed to directly
- ✅ No build triggers
- ✅ Safe for experimentation

### **main Branch:**
- 🔒 **Protected** - Only via PRs
- 🔒 **No direct pushes** - Prevents accidental builds
- 🔒 **Requires PR** - All changes must be reviewed
- 🔒 **Build triggers** - Only when PRs are merged

## 🚀 **Deployment Process**

### **Automatic Deployment:**
- ✅ **Vercel builds** only when PRs are merged to main
- ✅ **Manual deployment** via GitHub Actions (when needed)
- ✅ **Preview deployments** for testing PRs

### **Manual Deployment:**
- Go to GitHub Actions
- Run "Vercel Deploy" workflow manually
- Choose production or preview environment

## 📝 **Commit Message Guidelines**

```bash
# Feature additions
git commit -m "feat: Add new contact form validation"

# Bug fixes
git commit -m "fix: Resolve theme switcher not working"

# Documentation
git commit -m "docs: Update deployment guide"

# Security fixes
git commit -m "security: Remove exposed API token"

# Refactoring
git commit -m "refactor: Simplify component structure"
```

## 🔍 **Current Status**

- ✅ **Current Branch**: `feature/v2`
- ✅ **Obsolete Branch**: `feature/v1` (deleted)
- ✅ **Main Branch**: Protected and stable
- ✅ **Workflow**: PR-based development

## ⚠️ **Important Notes**

1. **Never checkout main** - Always stay on feature/v2
2. **Always use PRs** - This prevents unnecessary Vercel builds
3. **Test locally first** - Use `npm run dev` before pushing
4. **Keep main stable** - Only merge tested, working code
5. **Use descriptive commits** - Makes PR reviews easier

---

**Remember**: The main branch is sacred - only touch it through Pull Requests! 🛡️
