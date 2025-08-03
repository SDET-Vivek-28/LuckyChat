/**
 * LuckyChat Status Check
 * 
 * Copyright © 2024 Appvik. All rights reserved.
 */

const http = require('http');

console.log('🔍 Checking LuckyChat Server Status...\n');

const ports = [3000, 3001, 3002, 4000];

async function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: port,
      path: '/',
      method: 'GET',
      timeout: 2000
    }, (res) => {
      console.log(`✅ Server is running on port ${port}`);
      console.log(`🌐 Open: http://localhost:${port}`);
      resolve(true);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function main() {
  console.log('🔍 Checking available ports...\n');
  
  for (const port of ports) {
    const isRunning = await checkPort(port);
    if (isRunning) {
      console.log('\n🎉 LuckyChat is ready to use!');
      console.log(`📱 Open your browser and go to: http://localhost:${port}`);
      console.log('🐕 Start chatting with Lucky!');
      return;
    }
  }
  
  console.log('❌ No server found on common ports');
  console.log('\n💡 To start the server:');
  console.log('1. Run: npm run dev');
  console.log('2. Or: npx next dev --port 4000');
  console.log('3. Wait for "✓ Starting..." message');
  console.log('4. Open browser to the URL shown');
}

main(); 