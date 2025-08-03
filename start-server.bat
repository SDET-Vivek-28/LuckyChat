@echo off
echo 🚀 Starting LuckyChat Development Server...
echo.

echo 📦 Installing dependencies...
npm install

echo.
echo 🔧 Starting development server...
echo 🌐 Server will be available at: http://localhost:4000
echo.

node diagnose.js

npx next dev --port 4000

pause 