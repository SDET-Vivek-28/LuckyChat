/**
 * Simple Test Script for LuckyChat
 * Copyright © 2024 Appvik. All rights reserved.
 */

console.log('🧪 Testing LuckyChat Setup...\n');

// Test 1: Basic Node.js
console.log('✅ Node.js is working');

// Test 2: File system
const fs = require('fs');
if (fs.existsSync('package.json')) {
  console.log('✅ package.json exists');
} else {
  console.log('❌ package.json missing');
  process.exit(1);
}

// Test 3: Read package.json
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('✅ package.json is valid JSON');
  console.log(`   Project: ${packageJson.name}`);
  console.log(`   Version: ${packageJson.version}`);
} catch (error) {
  console.log('❌ package.json is invalid:', error.message);
  process.exit(1);
}

// Test 4: Check dependencies
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules exists');
} else {
  console.log('❌ node_modules missing - run: npm install');
  process.exit(1);
}

// Test 5: Check Next.js
try {
  const nextPath = require.resolve('next');
  console.log('✅ Next.js is installed');
} catch (error) {
  console.log('❌ Next.js not found - run: npm install');
  process.exit(1);
}

// Test 6: Check key files
const keyFiles = [
  'app/page.tsx',
  'lib/custom-ai-service.ts',
  'lib/ai-service.ts'
];

console.log('\n📁 Checking key files:');
keyFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} missing`);
  }
});

console.log('\n🔧 Next steps:');
console.log('1. If all files exist, try: npm run build');
console.log('2. If build succeeds, try: npx next dev --port 5000');
console.log('3. If still stuck, check your antivirus/firewall');

console.log('\n🚀 Ready to test!'); 