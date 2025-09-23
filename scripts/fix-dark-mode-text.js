const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all tsx and ts files
const findCommand = `find src -name "*.tsx" -o -name "*.ts"`;
const files = execSync(findCommand, { encoding: 'utf8' }).trim().split('\n');

console.log(`Found ${files.length} files to process`);

// Replacements to make
const replacements = [
  { from: 'dark:text-gray-300', to: 'dark:text-white' },
  { from: 'dark:text-gray-400', to: 'dark:text-white' },
  { from: 'dark:text-gray-500', to: 'dark:text-white' },
  { from: 'dark:text-gray-600', to: 'dark:text-white' },
];

let totalReplacements = 0;

files.forEach(file => {
  if (!file.trim()) return;

  try {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    replacements.forEach(replacement => {
      const regex = new RegExp(replacement.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, replacement.to);
        modified = true;
        totalReplacements += matches.length;
        console.log(`Replaced ${matches.length} instances of "${replacement.from}" with "${replacement.to}" in ${file}`);
      }
    });

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log(`\nTotal replacements made: ${totalReplacements}`);
