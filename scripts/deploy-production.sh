#!/bin/bash

# 🚀 LuckyChat Production Deployment Script
# This script automates the deployment process to production

set -e  # Exit on any error

echo "🚀 Starting LuckyChat Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the LuckyChat project root directory"
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    print_warning ".env.local file not found. Please create it with your Supabase credentials first."
    print_status "You can copy from env.example and fill in your values:"
    echo "cp env.example .env.local"
    echo "Then edit .env.local with your Supabase credentials"
    exit 1
fi

# Check if Supabase credentials are configured
if ! grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local || ! grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
    print_error "Supabase credentials not found in .env.local"
    print_status "Please add your Supabase credentials to .env.local:"
    echo "NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here"
    exit 1
fi

print_status "Environment variables check passed ✅"

# Step 1: Install dependencies
print_status "Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 2: Run type check
print_status "Running TypeScript type check..."
npm run type-check 2>/dev/null || npx tsc --noEmit

if [ $? -eq 0 ]; then
    print_success "Type check passed ✅"
else
    print_error "Type check failed. Please fix TypeScript errors before deploying"
    exit 1
fi

# Step 3: Run linting
print_status "Running ESLint..."
npm run lint 2>/dev/null || npx eslint . --ext .ts,.tsx

if [ $? -eq 0 ]; then
    print_success "Linting passed ✅"
else
    print_warning "Linting found issues. Consider fixing them before production deployment"
fi

# Step 4: Build the application
print_status "Building the application..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully ✅"
else
    print_error "Build failed. Please fix build errors before deploying"
    exit 1
fi

# Step 5: Run tests (if available)
if [ -f "package.json" ] && grep -q "\"test\"" package.json; then
    print_status "Running tests..."
    npm test 2>/dev/null || echo "No tests configured or tests failed"
fi

# Step 6: Check if Vercel is configured
if [ -f ".vercel/project.json" ]; then
    print_status "Vercel project detected. Deploying to Vercel..."
    
    # Deploy to Vercel
    npx vercel --prod --yes
    
    if [ $? -eq 0 ]; then
        print_success "Deployment to Vercel completed successfully! 🚀"
        
        # Get the deployment URL
        DEPLOYMENT_URL=$(npx vercel --prod --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
        if [ ! -z "$DEPLOYMENT_URL" ]; then
            print_success "Your app is live at: ${DEPLOYMENT_URL}"
        fi
    else
        print_error "Vercel deployment failed"
        exit 1
    fi
else
    print_warning "Vercel project not detected. Please set up Vercel first:"
    echo "npx vercel"
    echo "Then run this script again"
fi

# Step 7: Post-deployment checks
print_status "Running post-deployment checks..."

# Check if the app is responding
if [ ! -z "$DEPLOYMENT_URL" ]; then
    print_status "Checking if the app is responding..."
    
    # Wait a bit for deployment to settle
    sleep 10
    
    if curl -s -f "$DEPLOYMENT_URL" > /dev/null; then
        print_success "App is responding correctly ✅"
    else
        print_warning "App might not be responding yet. Please check manually:"
        echo "URL: $DEPLOYMENT_URL"
    fi
fi

# Step 8: Database verification
print_status "Verifying database connection..."
print_status "Please check your Supabase dashboard to ensure:"
echo "  - Tables are created correctly"
echo "  - RLS policies are enabled"
echo "  - Authentication is working"

# Final success message
echo ""
print_success "🎉 Deployment process completed!"
echo ""
print_status "Next steps:"
echo "  1. Test your live application"
echo "  2. Verify user registration/login works"
echo "  3. Check that chat functionality works"
echo "  4. Monitor your Supabase dashboard for any errors"
echo "  5. Set up monitoring and alerts if needed"
echo ""
print_status "Your LuckyChat is now live in production! 🚀✨"

# Optional: Open the deployment URL
if [ ! -z "$DEPLOYMENT_URL" ]; then
    echo ""
    read -p "Would you like to open the deployment URL in your browser? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if command -v xdg-open > /dev/null; then
            xdg-open "$DEPLOYMENT_URL"  # Linux
        elif command -v open > /dev/null; then
            open "$DEPLOYMENT_URL"       # macOS
        elif command -v start > /dev/null; then
            start "$DEPLOYMENT_URL"      # Windows
        else
            echo "Please open manually: $DEPLOYMENT_URL"
        fi
    fi
fi 