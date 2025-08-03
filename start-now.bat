@echo off
echo 🚀 Starting LuckyChat Server...
echo.

echo 📦 Installing dependencies...
call npm install

echo.
echo 🔧 Building project...
call npm run build

echo.
echo 🌐 Starting server on port 4000...
echo 📱 Open browser to: http://localhost:4000
echo.

call npx next dev --port 4000

pause 