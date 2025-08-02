#!/bin/bash

# 🆓 FREE DEPLOYMENT SCRIPT FOR LUCKYCHAT
# This script helps you deploy LuckyChat for FREE!

echo "🚀 LuckyChat FREE Deployment Script"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🔨 Building the app..."
npm run build

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📱 FREE DEPLOYMENT OPTIONS:"
echo "=========================="
echo ""
echo "1. 🆓 VERCEL (Recommended - Completely FREE):"
echo "   - Install Vercel CLI: npm i -g vercel"
echo "   - Deploy: vercel --prod"
echo "   - Get a free domain like: lucky-chat.vercel.app"
echo ""
echo "2. 🆓 NETLIFY (Completely FREE):"
echo "   - Install Netlify CLI: npm i -g netlify-cli"
echo "   - Deploy: netlify deploy --prod --dir=out"
echo "   - Get a free domain like: lucky-chat.netlify.app"
echo ""
echo "3. 🆓 GITHUB PAGES (Completely FREE):"
echo "   - Push to GitHub repository"
echo "   - Enable GitHub Pages in repository settings"
echo "   - Get a free domain like: username.github.io/lucky-chat"
echo ""
echo "4. 🆓 SURGE (Completely FREE):"
echo "   - Install Surge: npm i -g surge"
echo "   - Deploy: surge out lucky-chat.surge.sh"
echo ""
echo "💰 MONETIZATION SETUP:"
echo "====================="
echo ""
echo "1. Set up Stripe for payments (free to start):"
echo "   - Create Stripe account: https://stripe.com"
echo "   - Add payment processing to your app"
echo ""
echo "2. Mobile App Stores (one-time fees):"
echo "   - Google Play Console: $25 (one-time)"
echo "   - Apple Developer Account: $99/year"
echo ""
echo "3. OpenAI API (free tier available):"
echo "   - Free tier: $5 credit monthly"
echo "   - Users can use their own API keys"
echo ""
echo "🚀 NEXT STEPS:"
echo "=============="
echo ""
echo "1. Choose a deployment option above"
echo "2. Set up your domain (optional - $10-15/year)"
echo "3. Configure environment variables"
echo "4. Set up payment processing"
echo "5. Launch marketing campaign"
echo ""
echo "💡 TIP: Start with Vercel - it's the easiest and completely free!"
echo ""
echo "Your LuckyChat app is ready to launch and earn money! 🐕💰" 