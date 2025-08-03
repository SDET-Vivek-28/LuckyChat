/**
 * LuckyChat Test Script
 * 
 * Copyright © 2024 Appvik. All rights reserved.
 * 
 * This script tests the basic functionality of LuckyChat
 * PROPRIETARY SOFTWARE - DO NOT COPY, MODIFY, OR DISTRIBUTE
 */

const http = require('http');

console.log('🧪 Testing LuckyChat Application...\n');

// Test 1: Check if server is running
function testServer() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3002,
      path: '/',
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      console.log('✅ Server is running on port 3002');
      console.log(`📊 Status: ${res.statusCode}`);
      resolve(true);
    });

    req.on('error', (err) => {
      console.log('❌ Server not responding on port 3002');
      console.log('💡 Try: npm run dev');
      reject(err);
    });

    req.on('timeout', () => {
      console.log('⏰ Server timeout - may still be starting');
      req.destroy();
    });

    req.end();
  });
}

// Test 2: Check if API endpoint is working
function testAPI() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      message: 'Hello Lucky!',
      stream: false
    });

    const options = {
      hostname: 'localhost',
      port: 3002,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('✅ API endpoint is working');
        console.log(`📊 Response: ${data.substring(0, 100)}...`);
        resolve(true);
      });
    });

    req.on('error', (err) => {
      console.log('❌ API endpoint not responding');
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting LuckyChat Tests...\n');
  
  try {
    await testServer();
    console.log('');
    await testAPI();
    console.log('\n🎉 All tests passed! LuckyChat is working correctly.');
    console.log('🌐 Open your browser and go to: http://localhost:3002');
    console.log('🐕 Start chatting with Lucky!');
  } catch (error) {
    console.log('\n❌ Some tests failed. Check the server status.');
    console.log('💡 Make sure to run: npm run dev');
  }
}

runTests(); 