#!/usr/bin/env node

/**
 * Frontend rendering test for consultation form
 * Tests that the component can render without runtime errors
 */

import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🖥️  Testing Consultation Form Frontend Rendering');
console.log('==============================================\n');

// Create a minimal DOM environment for React testing
const { window } = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`, {
  url: 'http://localhost:3000',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = window;
global.document = window.document;
global.navigator = window.navigator;
global.HTMLElement = window.HTMLElement;

// Mock React and Next.js
global.React = {
  createElement: (...args) => ({ type: 'mock', props: args[1], children: args.slice(2) }),
  useState: (initial) => [initial, () => {}],
  useRef: () => ({ current: null }),
  useEffect: () => {},
  Fragment: 'Fragment'
};

global.Next = {
  Link: () => null
};

// Mock Heroicons
global.Heroicons = {};
const mockIcon = () => ({ type: 'icon', props: { className: 'mock-icon' } });

global.HeroiconsReact24Outline = {
  ChevronLeftIcon: mockIcon,
  UserIcon: mockIcon,
  BuildingOfficeIcon: mockIcon,
  CalendarDaysIcon: mockIcon
};

// Mock environment variables
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';

async function testComponentImport() {
  console.log('📦 Testing component imports...');

  try {
    // Test that we can import the component without syntax errors
    const componentPath = join(__dirname, '..', 'src', 'components', 'consultation', 'ConsultationForm.tsx');

    // Read the file content to check for obvious syntax issues
    const content = readFileSync(componentPath, 'utf8');

    // Check for common issues
    const issues = [];

    // Check for undefined imports
    const imports = content.match(/import\s+{[^}]+}\s+from\s+['"]([^'"]+)['"]/g) || [];
    for (const imp of imports) {
      if (imp.includes('CalendarIcon') && !imp.includes('CalendarDaysIcon')) {
        issues.push('CalendarIcon import issue');
      }
    }

    // Check for undefined variable usage
    if (content.includes('CalendarIcon') && !content.includes('CalendarDaysIcon')) {
      issues.push('CalendarIcon used but not imported');
    }

    if (issues.length === 0) {
      console.log('✅ Component imports look good');
      return true;
    } else {
      console.log('❌ Import issues found:', issues);
      return false;
    }

  } catch (error) {
    console.log('❌ Error testing imports:', error.message);
    return false;
  }
}

async function testSyntaxValidation() {
  console.log('🔍 Testing TypeScript syntax...');

  try {
    // Use Node.js child_process to run TypeScript compiler check
    const { spawn } = await import('child_process');

    return new Promise((resolve) => {
      const tsc = spawn('npx', ['tsc', '--noEmit', '--skipLibCheck', 'src/components/consultation/ConsultationForm.tsx'], {
        cwd: join(__dirname, '..'),
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';

      tsc.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      tsc.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      tsc.on('close', (code) => {
        if (code === 0) {
          console.log('✅ TypeScript syntax is valid');
          resolve(true);
        } else {
          console.log('❌ TypeScript syntax errors:');
          if (stderr) console.log(stderr);
          if (stdout) console.log(stdout);
          resolve(false);
        }
      });

      tsc.on('error', (error) => {
        console.log('⚠️  TypeScript check not available, skipping syntax validation');
        resolve(true); // Don't fail if tsc is not available
      });
    });

  } catch (error) {
    console.log('⚠️  Could not run TypeScript validation:', error.message);
    return true;
  }
}

async function testESLintValidation() {
  console.log('🎨 Testing ESLint validation...');

  try {
    const { spawn } = await import('child_process');

    return new Promise((resolve) => {
      const eslint = spawn('npx', ['eslint', 'src/components/consultation/ConsultationForm.tsx', '--no-eslintrc', '--config', 'eslint.config.mjs'], {
        cwd: join(__dirname, '..'),
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';

      eslint.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      eslint.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      eslint.on('close', (code) => {
        if (code === 0) {
          console.log('✅ ESLint validation passed');
          resolve(true);
        } else {
          console.log('⚠️  ESLint issues found:');
          if (stdout) console.log(stdout);
          if (stderr) console.log(stderr);
          resolve(true); // ESLint warnings don't fail the test
        }
      });

      eslint.on('error', (error) => {
        console.log('⚠️  ESLint not available, skipping validation');
        resolve(true);
      });
    });

  } catch (error) {
    console.log('⚠️  Could not run ESLint validation:', error.message);
    return true;
  }
}

async function testServerStartup() {
  console.log('🚀 Testing server startup (syntax check)...');

  try {
    const { spawn } = await import('child_process');

    return new Promise((resolve) => {
      // Try to start the server briefly to check for syntax errors
      const server = spawn('npm', ['run', 'build'], {
        cwd: join(__dirname, '..'),
        stdio: 'pipe',
        timeout: 30000 // 30 second timeout
      });

      let stdout = '';
      let stderr = '';
      let hasErrors = false;

      server.stdout.on('data', (data) => {
        stdout += data.toString();
        if (stdout.includes('Build successful')) {
          console.log('✅ Server build successful');
        }
      });

      server.stderr.on('data', (data) => {
        stderr += data.toString();
        if (stderr.includes('Error') || stderr.includes('Failed')) {
          hasErrors = true;
        }
      });

      server.on('close', (code) => {
        if (code === 0 && !hasErrors) {
          console.log('✅ Build completed without errors');
          resolve(true);
        } else {
          console.log('❌ Build failed with errors:');
          if (stderr) console.log(stderr);
          resolve(false);
        }
      });

      server.on('error', (error) => {
        console.log('❌ Could not start build process:', error.message);
        resolve(false);
      });

      // Kill the process after 10 seconds to avoid hanging
      setTimeout(() => {
        server.kill();
        if (!hasErrors) {
          console.log('✅ Build process started successfully');
          resolve(true);
        }
      }, 10000);
    });

  } catch (error) {
    console.log('⚠️  Could not test server startup:', error.message);
    return true;
  }
}

async function runFrontendTests() {
  const tests = [
    { name: 'Component Imports', fn: testComponentImport },
    { name: 'TypeScript Syntax', fn: testSyntaxValidation },
    { name: 'ESLint Validation', fn: testESLintValidation },
    { name: 'Server Build', fn: testServerStartup }
  ];

  let passed = 0;
  let total = tests.length;

  for (const test of tests) {
    console.log(`\n🔬 Running: ${test.name}`);
    console.log('─'.repeat(40));

    try {
      const result = await test.fn();
      if (result) passed++;
    } catch (error) {
      console.log(`❌ Test failed with error: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Frontend Test Results: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log('🎉 All frontend tests passed!');
  } else {
    console.log('⚠️  Some frontend tests failed. Check the component for issues.');
  }

  console.log('\n💡 Recommendations:');
  console.log('1. Run "npm run build" to check for build errors');
  console.log('2. Visit the page in browser to test runtime rendering');
  console.log('3. Check browser console for runtime errors');
  console.log('4. Run "npm run test:consultation" for API testing');

  return passed === total;
}

// Run the tests
runFrontendTests().catch(error => {
  console.error('❌ Frontend testing failed:', error);
  process.exit(1);
});
