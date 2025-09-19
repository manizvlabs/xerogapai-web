#!/bin/bash

echo "🔧 Starting ESLint error fixes..."

# Fix unescaped apostrophes (single quotes) in JSX
echo "📝 Fixing unescaped apostrophes..."
find src/ -name "*.tsx" -type f -exec sed -i "s/it's/it\&apos;s/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/can't/can\&apos;t/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/won't/won\&apos;t/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/don't/don\&apos;t/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/you're/you\&apos;re/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/we're/we\&apos;re/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/they're/they\&apos;re/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/we've/we\&apos;ve/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/they've/they\&apos;ve/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/you've/you\&apos;ve/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/I've/I\&apos;ve/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/isn't/isn\&apos;t/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/aren't/aren\&apos;t/g" {} \;
find src/ -name "*.tsx" -type f -exec sed -i "s/hasn't/hasn\&apos;t/g" {} \;

# Fix unescaped quotes in JSX
echo "📝 Fixing unescaped quotes..."
find src/ -name "*.tsx" -type f -exec sed -i 's/"/\&quot;/g' {} \;

echo "✅ Bulk fixes completed!"
echo "🔍 Running linter to check remaining errors..."
npm run lint
