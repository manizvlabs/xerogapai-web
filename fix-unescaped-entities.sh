#!/bin/bash

echo "🔧 Starting bulk fix for unescaped entities in JSX..."

# Get list of files with unescaped entity errors
echo "📋 Finding files with unescaped entities..."
npm run lint 2>&1 | grep "can be escaped with" | sed 's/:.*$//' | sort | uniq > unescaped_files.txt

echo "📝 Files to fix: $(wc -l < unescaped_files.txt)"

# Fix the most common patterns
echo "🔄 Fixing common unescaped entities..."

# Fix apostrophes in contractions
echo "  - Fixing contractions..."
sed -i "s/you're/you\&apos;re/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true
sed -i "s/don't/don\&apos;t/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true
sed -i "s/can't/can\&apos;t/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true
sed -i "s/won't/won\&apos;t/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true
sed -i "s/isn't/isn\&apos;t/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true
sed -i "s/aren't/aren\&apos;t/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true
sed -i "s/we're/we\&apos;re/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true
sed -i "s/they're/they\&apos;re/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true
sed -i "s/it's/it\&apos;s/g" src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true

# Fix quotes
echo "  - Fixing quotes..."
sed -i 's/"/\&quot;/g' src/components/careers/*.tsx src/components/assessment/*.tsx src/components/demo/*.tsx 2>/dev/null || true

echo "✅ Bulk fixes completed!"
echo "🔍 Running linter to check progress..."
npm run lint 2>&1 | grep -E "✖|error" | tail -3

# Cleanup
rm -f unescaped_files.txt

echo "🎯 Check the error count reduction above!"
