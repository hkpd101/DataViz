#!/bin/bash

# Steel Production Dashboard - Deployment Script
# This script helps deploy the application to various platforms

echo "🏭 Steel Production Dashboard - Deployment Helper"
echo "=================================================="

# Check if we have the required tools
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        return 1
    else
        echo "✅ $1 is available"
        return 0
    fi
}

echo "🔍 Checking required tools..."
check_tool "node"
check_tool "npm"
check_tool "git"

echo ""
echo "📋 Deployment Options:"
echo "1. Deploy Frontend to Vercel"
echo "2. Deploy Backend to Railway"
echo "3. Deploy Backend to Render"
echo "4. Deploy Full Stack to Railway"
echo "5. Create Docker containers"
echo ""

read -p "Choose deployment option (1-5): " choice

case $choice in
    1)
        echo "🚀 Deploying Frontend to Vercel..."
        echo "1. Install Vercel CLI: npm i -g vercel"
        echo "2. Login to Vercel: vercel login"
        echo "3. Deploy: vercel --prod"
        echo "4. Set environment variables in Vercel dashboard:"
        echo "   - NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app"
        echo "   - NEXT_PUBLIC_WS_URL=wss://your-backend-url.railway.app/ws"
        ;;
    2)
        echo "🚀 Deploying Backend to Railway..."
        echo "1. Create account at railway.app"
        echo "2. Install Railway CLI: npm i -g @railway/cli"
        echo "3. Login: railway login"
        echo "4. Navigate to backend folder: cd backend"
        echo "5. Deploy: railway up"
        echo "6. Set environment variables if needed"
        ;;
    3)
        echo "🚀 Deploying Backend to Render..."
        echo "1. Create account at render.com"
        echo "2. Connect your GitHub repository"
        echo "3. Create new Web Service"
        echo "4. Set build command: pip install -r requirements-simple.txt"
        echo "5. Set start command: uvicorn main_simple:app --host 0.0.0.0 --port \$PORT"
        echo "6. Set environment variables if needed"
        ;;
    4)
        echo "🚀 Deploying Full Stack to Railway..."
        echo "This will deploy both frontend and backend to Railway"
        echo "1. Create account at railway.app"
        echo "2. Install Railway CLI: npm i -g @railway/cli"
        echo "3. Login: railway login"
        echo "4. Deploy backend first, then frontend"
        ;;
    5)
        echo "🐳 Creating Docker containers..."
        echo "This will help you containerize the application"
        ;;
    *)
        echo "❌ Invalid option selected"
        ;;
esac
