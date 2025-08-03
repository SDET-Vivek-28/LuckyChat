@echo off
echo 🔧 Fixing LuckyChat Server Issues...
echo.

echo 🛑 Killing existing Node processes...
taskkill /f /im node.exe 2>nul

echo.
echo 🧹 Clearing cache...
if exist .next rmdir /s /q .next

echo.
echo 📦 Reinstalling dependencies...
npm install

echo.
echo 🔧 Building project...
npm run build

echo.
echo 🚀 Starting server on port 5000...
echo 🌐 Server will be available at: http://localhost:5000
echo.

npx next dev --port 5000

pause 