@echo off
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                🧹 Project Cleanup Script                     ║
echo ║          Remove Unnecessary Files and Folders               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 📋 This script will clean up unnecessary files to keep your project lean
echo.

echo 🗑️ Files and folders to be removed:
echo.
echo 📄 Documentation (redundant):
echo    • MANUAL_STARTUP.md
echo    • PROJECT_SETUP_COMPLETE.md  
echo    • STARTUP_GUIDE.md
echo    • DEPLOYMENT-CHECKLIST.md
echo    • DEPLOYMENT.md (keeping RAILWAY-DEPLOYMENT.md)
echo.
echo 🚀 Scripts (redundant):
echo    • deploy.sh (Linux version)
echo    • quick-deploy.bat (redundant)
echo    • setup-dev.bat (info in README)
echo    • start.bat (use npm commands)
echo.
echo 🐳 Docker files (not needed for Railway):
echo    • docker-compose.yml
echo    • docker/ folder
echo.
echo 📊 Sample data (backend generates data):
echo    • datasets/ folder
echo.
echo ⚙️ Environment files (redundant):
echo    • .env.example (keeping .env.production)
echo.

set /p confirm="Continue with cleanup? (y/N): "
if /i not "%confirm%"=="y" (
    echo Cleanup cancelled.
    pause
    exit
)

echo.
echo 🧹 Starting cleanup...
echo.

REM Remove redundant documentation
if exist "MANUAL_STARTUP.md" (
    del "MANUAL_STARTUP.md" >nul 2>&1
    echo ✅ Removed MANUAL_STARTUP.md
)

if exist "PROJECT_SETUP_COMPLETE.md" (
    del "PROJECT_SETUP_COMPLETE.md" >nul 2>&1
    echo ✅ Removed PROJECT_SETUP_COMPLETE.md
)

if exist "STARTUP_GUIDE.md" (
    del "STARTUP_GUIDE.md" >nul 2>&1
    echo ✅ Removed STARTUP_GUIDE.md
)

if exist "DEPLOYMENT-CHECKLIST.md" (
    del "DEPLOYMENT-CHECKLIST.md" >nul 2>&1
    echo ✅ Removed DEPLOYMENT-CHECKLIST.md
)

if exist "DEPLOYMENT.md" (
    del "DEPLOYMENT.md" >nul 2>&1
    echo ✅ Removed DEPLOYMENT.md
)

REM Remove redundant scripts
if exist "deploy.sh" (
    del "deploy.sh" >nul 2>&1
    echo ✅ Removed deploy.sh
)

if exist "quick-deploy.bat" (
    del "quick-deploy.bat" >nul 2>&1
    echo ✅ Removed quick-deploy.bat
)

if exist "setup-dev.bat" (
    del "setup-dev.bat" >nul 2>&1
    echo ✅ Removed setup-dev.bat
)

if exist "start.bat" (
    del "start.bat" >nul 2>&1
    echo ✅ Removed start.bat
)

REM Remove Docker files
if exist "docker-compose.yml" (
    del "docker-compose.yml" >nul 2>&1
    echo ✅ Removed docker-compose.yml
)

if exist "docker" (
    rmdir /s /q "docker" >nul 2>&1
    echo ✅ Removed docker/ folder
)

REM Remove sample datasets
if exist "datasets" (
    rmdir /s /q "datasets" >nul 2>&1
    echo ✅ Removed datasets/ folder
)

REM Remove redundant environment file
if exist ".env.example" (
    del ".env.example" >nul 2>&1
    echo ✅ Removed .env.example
)

echo.
echo ╔════════════════════════════════════╗
echo ║         🎉 Cleanup Complete!       ║
echo ╚════════════════════════════════════╝
echo.
echo ✅ Project is now clean and optimized!
echo.
echo 📁 Essential files kept:
echo    • README.md - Main documentation
echo    • RAILWAY-DEPLOYMENT.md - Deployment guide
echo    • MAKE-IT-YOURS.md - Repository setup guide
echo    • railway-deploy.bat - Interactive deployment
echo    • make-it-yours.bat - Repository setup script
echo    • package.json - Dependencies and scripts
echo    • All source code (src/, pages/, backend/)
echo    • Configuration files (.env.production, railway.toml, etc.)
echo.
echo 🚀 Your project is ready for:
echo    • GitHub repository creation
echo    • Railway deployment
echo    • Portfolio showcase
echo.
pause
