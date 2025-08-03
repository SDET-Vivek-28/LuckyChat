/**
 * Test Browser Connection
 * Copyright © 2024 Appvik. All rights reserved.
 */

const http = require('http');

console.log('🧪 Testing server connection...\n');

// Test different ports
const ports = [3000, 3001, 3002, 4000, 5000];

async function testPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      console.log(`✅ Port ${port}: Server responding (Status: ${res.statusCode})`);
      resolve(true);
    });
    
    req.on('error', (err) => {
      console.log(`❌ Port ${port}: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      console.log(`⏰ Port ${port}: Timeout`);
      req.destroy();
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('🔍 Testing server on different ports...\n');
  
  for (const port of ports) {
    await testPort(port);
  }
  
  console.log('\n📋 Instructions:');
  console.log('1. If you see "✅" for any port, that server is working');
  console.log('2. Open browser to: http://localhost:[PORT]');
  console.log('3. If browser shows blank page, check browser console (F12)');
  console.log('4. Look for any error messages in the browser console');
  
  console.log('\n🔧 If browser shows blank page:');
  console.log('- Press F12 in browser to open Developer Tools');
  console.log('- Click on "Console" tab');
  console.log('- Look for any red error messages');
  console.log('- Tell me what errors you see');
}

runTests(); 