@echo off
color 0A
echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║               🚂 Railway Full Stack Deployment               ║
echo  ║          Steel Production Analytics Dashboard                ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo 📋 This guide will help you deploy both frontend and backend to Railway
echo.

:menu
echo ╔════════════════════════════════════╗
echo ║           Deployment Steps         ║
echo ╠════════════════════════════════════╣
echo ║ 1. Check Prerequisites             ║
echo ║ 2. Deploy Backend to Railway       ║
echo ║ 3. Deploy Frontend to Railway      ║
echo ║ 4. Configure Environment Variables ║
echo ║ 5. Test Deployment                 ║
echo ║ 6. View Complete Guide             ║
echo ║ 0. Exit                            ║
echo ╚════════════════════════════════════╝
echo.

set /p choice="Choose an option (0-6): "

if "%choice%"=="1" goto prerequisites
if "%choice%"=="2" goto backend
if "%choice%"=="3" goto frontend  
if "%choice%"=="4" goto environment
if "%choice%"=="5" goto testing
if "%choice%"=="6" goto guide
if "%choice%"=="0" goto exit
goto menu

:prerequisites
echo.
echo ╔════════════════════════════════════╗
echo ║        📋 Prerequisites            ║
echo ╚════════════════════════════════════╝
echo.
echo ✅ Required:
echo    • GitHub account with your code pushed
echo    • Railway account (free at railway.app)
echo    • Internet connection
echo.
echo 📂 Your project structure should be:
echo    your-repo/
echo    ├── backend/
echo    │   ├── main_simple.py
echo    │   ├── requirements-simple.txt
echo    │   └── Procfile
echo    ├── pages/
echo    ├── src/
echo    ├── package.json
echo    └── ... (other frontend files)
echo.
echo 🔗 Next: Push your code to GitHub if not already done:
echo    git add .
echo    git commit -m "Ready for Railway deployment"
echo    git push origin main
echo.
pause
goto menu

:backend
echo.
echo ╔════════════════════════════════════╗
echo ║      🔧 Deploy Backend Service     ║
echo ╚════════════════════════════════════╝
echo.
echo 📝 Step-by-step instructions:
echo.
echo 1. 🌐 Go to https://railway.app
echo 2. 📝 Sign up/Login with GitHub
echo 3. ➕ Click "New Project"
echo 4. 📂 Select "Deploy from GitHub repo"
echo 5. 🔍 Choose your repository: data-visualization
echo 6. ⚙️  IMPORTANT: Set Root Directory to "backend"
echo 7. 🚀 Click "Deploy"
echo.
echo 📊 Railway will:
echo    • Detect Python application
echo    • Install dependencies from requirements-simple.txt
echo    • Start server using Procfile command
echo    • Provide you with a backend URL
echo.
echo 💡 Save the backend URL! You'll need it for frontend.
echo    Example: https://backend-production-xxxx.up.railway.app
echo.
pause
goto menu

:frontend
echo.
echo ╔════════════════════════════════════╗
echo ║     🎨 Deploy Frontend Service     ║
echo ╚════════════════════════════════════╝
echo.
echo 📝 Step-by-step instructions:
echo.
echo 1. 🔄 In the same Railway project, click "New Service"
echo 2. 📂 Select "GitHub Repo" 
echo 3. 🔍 Choose the SAME repository again
echo 4. ⚙️  IMPORTANT: Set Root Directory to "." (project root)
echo 5. 🚀 Click "Deploy"
echo.
echo 📊 Railway will:
echo    • Detect Next.js application
echo    • Install dependencies from package.json
echo    • Build and start the frontend
echo    • Provide you with a frontend URL
echo.
echo 🌐 Your frontend will be available at:
echo    https://frontend-production-xxxx.up.railway.app
echo.
pause
goto menu

:environment
echo.
echo ╔════════════════════════════════════╗
echo ║    🔐 Configure Environment Vars   ║
echo ╚════════════════════════════════════╝
echo.
echo 📝 Frontend Environment Variables:
echo.
echo 1. 🎨 Go to your FRONTEND service in Railway
echo 2. 📑 Click "Variables" tab
echo 3. ➕ Add these variables:
echo.
echo    Variable Name: NEXT_PUBLIC_API_URL
echo    Value: [YOUR-BACKEND-RAILWAY-URL]
echo    Example: https://backend-production-xxxx.up.railway.app
echo.
echo    Variable Name: NEXT_PUBLIC_WS_URL  
echo    Value: [YOUR-BACKEND-WSS-URL]
echo    Example: wss://backend-production-xxxx.up.railway.app/ws
echo.
echo 4. 💾 Save variables
echo 5. 🔄 Redeploy frontend service
echo.
echo 💡 Backend typically doesn't need additional environment variables
echo    for this project, but you can add any if needed.
echo.
pause
goto menu

:testing
echo.
echo ╔════════════════════════════════════╗
echo ║        🧪 Test Deployment          ║
echo ╚════════════════════════════════════╝
echo.
echo 📝 Testing checklist:
echo.
echo ✅ Backend Health Check:
echo    1. Visit: https://your-backend-url.railway.app/health
echo    2. Should return: {"status":"healthy","version":"1.0.0"}
echo.
echo ✅ Backend API Test:
echo    1. Visit: https://your-backend-url.railway.app/docs
echo    2. Should show FastAPI documentation
echo.
echo ✅ Frontend Test:
echo    1. Visit: https://your-frontend-url.railway.app
echo    2. Should load the Steel Production Dashboard
echo    3. Check browser console for any errors
echo    4. Verify charts are loading data
echo    5. Test real-time WebSocket connections
echo.
echo ✅ Integration Test:
echo    1. Navigate through all dashboard views
echo    2. Verify data is displaying correctly
echo    3. Check mobile responsiveness
echo.
echo 🎉 If everything works - Congratulations! 
echo    Your dashboard is now live and accessible worldwide!
echo.
pause
goto menu

:guide
echo.
echo ╔════════════════════════════════════╗
echo ║       📚 Complete Guide            ║
echo ╚════════════════════════════════════╝
echo.
echo Opening the complete Railway deployment guide...
start RAILWAY-DEPLOYMENT.md
echo.
echo 📖 Also available:
echo    • DEPLOYMENT.md - General deployment guide
echo    • DEPLOYMENT-CHECKLIST.md - Pre-deployment checklist
echo.
pause
goto menu

:exit
echo.
echo ╔════════════════════════════════════╗
echo ║            🎉 Good Luck!           ║
echo ╚════════════════════════════════════╝
echo.
echo 🚀 Your Steel Production Dashboard will be live soon!
echo 🌐 Share the URL with your team once deployed
echo 📞 Need help? Check the documentation files
echo.
echo Happy deploying! 🚂
echo.
pause
exit
