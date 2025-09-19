#!/bin/bash

echo "🚀 Quick fix for remaining unescaped entities..."

# Fix the most common remaining patterns across all component files
echo "📝 Fixing contractions and quotes in all components..."

# Common contractions
find src/components/ -name "*.tsx" -type f -exec sed -i "s/We're/We\&apos;re/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/we're/we\&apos;re/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/Here's/Here\&apos;s/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/here's/here\&apos;s/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/It's/It\&apos;s/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/it's/it\&apos;s/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/That's/That\&apos;s/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/that's/that\&apos;s/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/who've/who\&apos;ve/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/You've/You\&apos;ve/g" {} \;
find src/components/ -name "*.tsx" -type f -exec sed -i "s/you've/you\&apos;ve/g" {} \;

# Business's pattern
find src/components/ -name "*.tsx" -type f -exec sed -i "s/Business's/Business\&apos;s/g" {} \;

# Fix quotes in testimonials and content
find src/components/ -name "*.tsx" -type f -exec sed -i 's/ className="text-4xl mb-4 text-gray-400">"/ className="text-4xl mb-4 text-gray-400">&quot;/g' {} \;

echo "✅ Quick fixes applied!"
echo "🔍 Checking progress..."
npm run lint 2>&1 | grep -E "✖|error" | tail -3
