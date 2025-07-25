@echo off
echo.
echo 🏭 Steel Production Dashboard - Quick Deploy
echo =============================================
echo.

echo 📋 Quick Deployment Options:
echo.
echo 1. Railway (Recommended - Free tier)
echo 2. Vercel + Railway (Frontend + Backend)
echo 3. Manual GitHub setup
echo 4. View deployment guide
echo.

set /p choice="Choose option (1-4): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Railway Deployment Steps:
    echo 1. Go to https://railway.app
    echo 2. Sign up with GitHub
    echo 3. Create new project from GitHub repo
    echo 4. Deploy backend first, then frontend
    echo.
    echo 📖 Full guide: Open DEPLOYMENT.md for detailed instructions
    pause
)

if "%choice%"=="2" (
    echo.
    echo 🚀 Vercel + Railway Deployment:
    echo Backend: Railway.app
    echo Frontend: Vercel.com
    echo.
    echo Steps:
    echo 1. Deploy backend to Railway first
    echo 2. Get backend URL from Railway
    echo 3. Deploy frontend to Vercel
    echo 4. Set NEXT_PUBLIC_API_URL in Vercel to Railway backend URL
    echo.
    pause
)

if "%choice%"=="3" (
    echo.
    echo 📂 Manual GitHub Setup:
    echo 1. Push code to GitHub if not already done:
    echo    git add .
    echo    git commit -m "Ready for deployment"
    echo    git push origin main
    echo.
    echo 2. Then use Railway or Vercel to deploy from GitHub
    pause
)

if "%choice%"=="4" (
    echo.
    echo 📖 Opening deployment guide...
    start DEPLOYMENT.md
)

echo.
echo ✅ Need help? Check DEPLOYMENT.md for detailed instructions
echo 🌐 Your dashboard will be online and accessible worldwide!
pause
