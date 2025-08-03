# LuckyChat Server Fix Script
# Copyright © 2024 Appvik. All rights reserved.

Write-Host "🔧 Fixing LuckyChat Server Issues..." -ForegroundColor Green
Write-Host ""

# Step 1: Kill existing processes
Write-Host "🛑 Killing existing Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Step 2: Clear cache
Write-Host "🧹 Clearing cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Write-Host "   ✅ Cache cleared"
} else {
    Write-Host "   ℹ️  No cache to clear"
}

# Step 3: Check dependencies
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "   📥 Installing dependencies..."
    npm install
} else {
    Write-Host "   ✅ Dependencies exist"
}

# Step 4: Build project
Write-Host "🔧 Building project..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "   ✅ Build successful"
} catch {
    Write-Host "   ❌ Build failed - trying to fix..."
    npm install
    npm run build
}

# Step 5: Start server
Write-Host "🚀 Starting server on port 5000..." -ForegroundColor Green
Write-Host "🌐 Server will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""

npx next dev --port 5000 