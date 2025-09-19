#!/bin/bash

echo "🎯 Targeted fix for unescaped entities..."

# Fix the most common patterns with proper escaping
echo "📝 Fixing common apostrophe patterns..."

# Fix contractions that appear in many files
find src/components/ -name "*.tsx" -exec sed -i 's/We&apos;re/We\&apos;re/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/we&apos;re/we\&apos;re/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/Here&apos;s/Here\&apos;s/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/It&apos;s/It\&apos;s/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/it&apos;s/it\&apos;s/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/That&apos;s/That\&apos;s/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/that&apos;s/that\&apos;s/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/You&apos;ve/You\&apos;ve/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/you&apos;ve/you\&apos;ve/g' {} \;
find src/components/ -name "*.tsx" -exec sed -i 's/who&apos;ve/who\&apos;ve/g' {} \;

# Fix quotes
echo "📝 Fixing quotes..."
find src/components/ -name "*.tsx" -exec sed -i 's/" className="/\&quot; className="/g' {} \;

echo "✅ Targeted fixes applied!"
echo "🔍 Checking progress..."
npm run lint 2>&1 | grep -E "✖|error" | tail -3
