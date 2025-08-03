/**
 * LuckyChat Diagnostic Tool
 * 
 * Copyright © 2024 Appvik. All rights reserved.
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 LuckyChat Diagnostic Tool\n');

// Check 1: Node.js version
console.log('1. Checking Node.js version...');
const nodeVersion = process.version;
console.log(`   Node.js: ${nodeVersion}`);
if (parseInt(nodeVersion.slice(1).split('.')[0]) < 18) {
  console.log('   ⚠️  Warning: Node.js 18+ recommended');
} else {
  console.log('   ✅ Node.js version is good');
}

// Check 2: Package.json exists
console.log('\n2. Checking package.json...');
if (fs.existsSync('package.json')) {
  console.log('   ✅ package.json found');
} else {
  console.log('   ❌ package.json not found');
  process.exit(1);
}

// Check 3: node_modules exists
console.log('\n3. Checking dependencies...');
if (fs.existsSync('node_modules')) {
  console.log('   ✅ node_modules found');
} else {
  console.log('   ❌ node_modules not found - run: npm install');
  process.exit(1);
}

// Check 4: Next.js config
console.log('\n4. Checking Next.js configuration...');
if (fs.existsSync('next.config.js')) {
  console.log('   ✅ next.config.js found');
} else {
  console.log('   ⚠️  next.config.js not found (optional)');
}

// Check 5: Environment file
console.log('\n5. Checking environment file...');
if (fs.existsSync('.env.local')) {
  console.log('   ✅ .env.local found');
} else {
  console.log('   ⚠️  .env.local not found (optional for custom AI)');
}

// Check 6: Key files exist
console.log('\n6. Checking key files...');
const keyFiles = [
  'app/page.tsx',
  'lib/custom-ai-service.ts',
  'lib/ai-service.ts',
  'components/LuckyAvatar.tsx'
];

keyFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} missing`);
  }
});

console.log('\n🔧 Solutions for common issues:');
console.log('\nIf server is stuck loading:');
console.log('1. Kill all Node processes: taskkill /f /im node.exe');
console.log('2. Clear cache: npm run build');
console.log('3. Reinstall dependencies: npm install');
console.log('4. Start on different port: npx next dev --port 5000');

console.log('\nIf build fails:');
console.log('1. Check TypeScript errors: npx tsc --noEmit');
console.log('2. Clear Next.js cache: rm -rf .next');
console.log('3. Reinstall: npm install');

console.log('\n🚀 Quick start commands:');
console.log('1. npm install');
console.log('2. npx next dev --port 5000');
console.log('3. Open: http://localhost:5000');

console.log('\n📞 If issues persist, check:');
console.log('- Node.js version (18+)');
console.log('- Available disk space');
console.log('- Firewall/antivirus blocking');
console.log('- Port conflicts'); 