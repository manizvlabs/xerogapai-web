# VyaptIX Website

This repository contains the VyaptIX website built with Vite, React, TypeScript, and Tailwind CSS.

## Requirements
- Node.js 18+ (recommended)
- npm 9+ (or a compatible package manager)

## Setup
```bash
npm install
```

## Environment Variables
Create a `.env` file in the project root:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Run Locally
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Lint and Typecheck
```bash
npm run lint
npm run typecheck
```

## Push This Repository to the Partner Git Repo
Target repo: `https://github.com/manizvlabs/vyaptix-website`

### If this folder is already a git repo with commits
```bash
git remote add origin https://github.com/manizvlabs/vyaptix-website
git branch -M main
git push -u origin main
```

### If you are not sure (safe, full setup)
```bash
git status
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/manizvlabs/vyaptix-website
git branch -M main
git push -u origin main
```

### If "remote origin already exists"
```bash
git remote set-url origin https://github.com/manizvlabs/vyaptix-website
git push -u origin main
```

### Authentication Note
If GitHub asks for a password, use a Personal Access Token (PAT) instead of your password.
