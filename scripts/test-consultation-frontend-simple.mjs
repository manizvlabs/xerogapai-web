#!/usr/bin/env node

/**
 * Simple frontend validation test for consultation form
 * Checks for common issues without requiring additional dependencies
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Simple Frontend Validation Test');
console.log('===================================\n');

function testComponentSyntax() {
  console.log('📝 Checking component syntax...');

  try {
    const componentPath = join(__dirname, '..', 'src', 'components', 'consultation', 'ConsultationForm.tsx');
    const content = readFileSync(componentPath, 'utf8');

    const issues = [];

    // Check for undefined icon imports
    const iconImports = content.match(/import\s+{[^}]+}\s+from\s+['"]@heroicons\/react\/24\/outline['"]/g);
    if (iconImports) {
      const importMatch = iconImports[0];
      const importedIcons = importMatch.match(/{([^}]+)}/);
      if (importedIcons) {
        const icons = importedIcons[1].split(',').map(icon => icon.trim());
        console.log('📦 Imported icons:', icons.join(', '));
      }
    }

    // Check for icon usage without import
    const usedIcons = content.match(/<([A-Z][a-zA-Z]+Icon)\s/g);
    if (usedIcons) {
      const uniqueUsedIcons = [...new Set(usedIcons.map(match => match.slice(1, -2)))];
      console.log('🎯 Used icons:', uniqueUsedIcons.join(', '));

      // Check if all used icons are imported
      const importText = content.match(/import\s+{[^}]+}\s+from\s+['"]@heroicons\/react\/24\/outline['"]/);
      if (importText) {
        const importedIconsText = importText[0];
        for (const usedIcon of uniqueUsedIcons) {
          if (!importedIconsText.includes(usedIcon)) {
            issues.push(`Icon "${usedIcon}" is used but not imported`);
          }
        }
      }
    }

    // Check for common syntax issues
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Check for unclosed JSX tags (basic check)
      const openTags = (line.match(/<[^/][^>]*>/g) || []).length;
      const closeTags = (line.match(/<\/[^>]+>/g) || []).length;
      if (openTags > closeTags + 1) { // Allow for self-closing tags
        issues.push(`Line ${lineNum}: Possible unclosed JSX tag`);
      }

      // Check for undefined variables (basic)
      if (line.includes('CalendarIcon') && !line.includes('import')) {
        issues.push(`Line ${lineNum}: CalendarIcon used but not imported`);
      }
    }

    if (issues.length === 0) {
      console.log('✅ No syntax issues found');
      return true;
    } else {
      console.log('❌ Issues found:');
      issues.forEach(issue => console.log(`   • ${issue}`));
      return false;
    }

  } catch (error) {
    console.log('❌ Error reading component:', error.message);
    return false;
  }
}

async function testBuildProcess() {
  console.log('🔨 Testing build process...');

  const { spawn } = await import('child_process');

  return new Promise((resolve) => {
    const build = spawn('npm', ['run', 'build'], {
      cwd: join(__dirname, '..'),
      stdio: 'pipe'
    });

    let hasErrors = false;
    let buildOutput = '';

    build.stdout.on('data', (data) => {
      const output = data.toString();
      buildOutput += output;

      // Check for success indicators
      if (output.includes('Compiled successfully') || output.includes('Build successful')) {
        console.log('✅ Build compilation successful');
      }
    });

    build.stderr.on('data', (data) => {
      const error = data.toString();
      buildOutput += error;

      // Check for error indicators
      if (error.includes('Error') || error.includes('Failed') || error.includes('not defined')) {
        hasErrors = true;
        console.log('❌ Build errors detected');
      }
    });

    build.on('close', (code) => {
      if (code === 0 && !hasErrors) {
        console.log('✅ Build completed successfully');
        resolve(true);
      } else {
        console.log('❌ Build failed');
        if (buildOutput.includes('CalendarIcon')) {
          console.log('🎯 Found CalendarIcon error (this was the original issue!)');
        }
        resolve(false);
      }
    });

    build.on('error', (error) => {
      console.log('❌ Build process error:', error.message);
      resolve(false);
    });
  });
}

async function runValidationTests() {
  console.log('🧪 Running Frontend Validation Tests\n');

  const tests = [
    { name: 'Component Syntax Check', fn: testComponentSyntax },
    { name: 'Build Process Test', fn: testBuildProcess }
  ];

  let passed = 0;
  const total = tests.length;

  for (const test of tests) {
    console.log(`\n🔬 ${test.name}`);
    console.log('─'.repeat(40));

    try {
      const result = await test.fn();
      if (result) passed++;
    } catch (error) {
      console.log(`❌ Test error: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passed}/${total} passed`);

  if (passed === total) {
    console.log('🎉 All frontend validation tests passed!');
    console.log('\n✅ The CalendarIcon issue has been fixed');
  } else {
    console.log('⚠️  Some tests failed - check the component');
  }

  console.log('\n💡 Why this test is useful:');
  console.log('• Catches undefined imports (like CalendarIcon)');
  console.log('• Validates build process succeeds');
  console.log('• Checks for common syntax errors');
  console.log('• Runs without requiring browser environment');

  console.log('\n🔗 Related tests:');
  console.log('• API testing: npm run test:consultation');
  console.log('• Manual testing: npm run test:consultation:manual valid');
  console.log('• Rate limits: npm run check:rate-limits');

  return passed === total;
}

// Run the tests
runValidationTests().catch(error => {
  console.error('❌ Validation testing failed:', error);
  process.exit(1);
});
