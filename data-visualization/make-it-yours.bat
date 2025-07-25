@echo off
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║              🔄 Make Project Your Own                        ║
echo ║          Steel Production Analytics Dashboard                ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 📋 This guide will help you create your own GitHub repository
echo.

:menu
echo ╔════════════════════════════════════╗
echo ║         Repository Setup           ║
echo ╠════════════════════════════════════╣
echo ║ 1. Check Current Git Status        ║
echo ║ 2. Remove Existing Git History     ║
echo ║ 3. Create New GitHub Repository    ║
echo ║ 4. Initialize New Git Repository   ║
echo ║ 5. Push to Your New Repository     ║
echo ║ 6. Verify Repository Setup         ║
echo ║ 0. Exit                            ║
echo ╚════════════════════════════════════╝
echo.

set /p choice="Choose an option (0-6): "

if "%choice%"=="1" goto status
if "%choice%"=="2" goto remove
if "%choice%"=="3" goto create
if "%choice%"=="4" goto initialize
if "%choice%"=="5" goto push
if "%choice%"=="6" goto verify
if "%choice%"=="0" goto exit
goto menu

:status
echo.
echo ╔════════════════════════════════════╗
echo ║       📊 Current Git Status        ║
echo ╚════════════════════════════════════╝
echo.
echo Checking current git configuration...
echo.
git remote -v
echo.
git status
echo.
echo 💡 Current remote origin shows where this project came from
echo    We'll change this to point to your new repository
echo.
pause
goto menu

:remove
echo.
echo ╔════════════════════════════════════╗
echo ║     🗑️ Remove Git History          ║
echo ╚════════════════════════════════════╝
echo.
echo ⚠️  WARNING: This will remove all git history!
echo    Your files will remain, but commit history will be lost.
echo.
set /p confirm="Continue? (y/N): "
if /i not "%confirm%"=="y" goto menu

echo.
echo Removing .git folder...
rmdir /s /q .git
echo ✅ Git history removed successfully!
echo.
echo 📁 Your project files are still here, just without git tracking
pause
goto menu

:create
echo.
echo ╔════════════════════════════════════╗
echo ║   🌐 Create GitHub Repository      ║
echo ╚════════════════════════════════════╝
echo.
echo 📝 Manual steps to create your repository:
echo.
echo 1. 🌐 Go to https://github.com
echo 2. 🔑 Login to your GitHub account
echo 3. ➕ Click "New" or "New repository"
echo 4. 📝 Choose a repository name, for example:
echo    • steel-production-dashboard
echo    • industrial-analytics-platform
echo    • manufacturing-monitoring-system
echo    • production-dashboard
echo.
echo 5. 📄 Add description (optional):
echo    "Advanced steel production monitoring and analytics platform"
echo.
echo 6. 🔓 Choose visibility:
echo    • Public (recommended for portfolio)
echo    • Private (if you want to keep it private)
echo.
echo 7. ❌ DO NOT initialize with README, .gitignore, or license
echo    (we already have these files)
echo.
echo 8. 🚀 Click "Create repository"
echo.
echo 💾 Save your new repository URL, you'll need it next!
echo    Example: https://github.com/yourusername/your-repo-name.git
echo.
pause
goto menu

:initialize
echo.
echo ╔════════════════════════════════════╗
echo ║    🔧 Initialize New Repository    ║
echo ╚════════════════════════════════════╝
echo.
echo 📝 Running git initialization commands...
echo.

echo Initializing new git repository...
git init
echo.

echo Adding all files...
git add .
echo.

echo Creating initial commit...
git commit -m "Initial commit: Steel Production Analytics Dashboard

- Advanced real-time monitoring platform
- Next.js frontend with React components
- FastAPI backend with WebSocket support
- 8 specialized dashboard views
- Glass morphism UI design
- Production-ready deployment configuration"
echo.

echo ✅ Local repository initialized successfully!
echo.
echo 🔗 Next: Add your GitHub repository as remote origin
set /p repo_url="Enter your GitHub repository URL: "

if "%repo_url%"=="" (
    echo ❌ No URL provided. You can add it manually later with:
    echo    git remote add origin https://github.com/yourusername/your-repo-name.git
) else (
    echo Adding remote origin...
    git remote add origin %repo_url%
    echo ✅ Remote origin added: %repo_url%
)

echo.
pause
goto menu

:push
echo.
echo ╔════════════════════════════════════╗
echo ║     🚀 Push to Your Repository     ║
echo ╚════════════════════════════════════╝
echo.
echo 📤 Pushing to your GitHub repository...
echo.

echo Checking remote configuration...
git remote -v
echo.

echo Pushing to main branch...
git branch -M main
git push -u origin main
echo.

if %errorlevel% equ 0 (
    echo ✅ Successfully pushed to GitHub!
    echo 🌐 Your repository is now live at GitHub
) else (
    echo ❌ Push failed. Common issues:
    echo    • Make sure you're logged into GitHub
    echo    • Check repository URL is correct
    echo    • Verify repository exists and you have write access
    echo.
    echo 🔧 Manual commands if needed:
    echo    git remote set-url origin https://github.com/yourusername/your-repo-name.git
    echo    git push -u origin main
)

echo.
pause
goto menu

:verify
echo.
echo ╔════════════════════════════════════╗
echo ║      ✅ Verify Repository Setup    ║
echo ╚════════════════════════════════════╝
echo.
echo 📊 Current repository status:
echo.

echo Remote repositories:
git remote -v
echo.

echo Branch information:
git branch -a
echo.

echo Recent commits:
git log --oneline -5
echo.

echo 🔍 Verification checklist:
echo ✅ Remote origin points to your GitHub repository
echo ✅ Main branch exists and is up to date
echo ✅ All files are committed and pushed
echo.
echo 🌐 Visit your GitHub repository to confirm everything is there!
echo.
pause
goto menu

:exit
echo.
echo ╔════════════════════════════════════╗
echo ║           🎉 Congratulations!      ║
echo ╚════════════════════════════════════╝
echo.
echo 🏆 Your Steel Production Dashboard is now YOUR project!
echo 📂 Repository is ready for deployment to Railway, Vercel, etc.
echo 🌍 Share it with the world as your own creation!
echo.
echo 📋 Next steps:
echo    • Deploy to Railway using railway-deploy.bat
echo    • Customize the project further
echo    • Add it to your portfolio
echo    • Share with potential employers/clients
echo.
echo Happy coding! 🚀
echo.
pause
exit
