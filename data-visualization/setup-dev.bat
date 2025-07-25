@echo off
echo Setting up Real-time Data Visualization Dashboard for local development...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed.
    echo Please install Python 3.11+ from https://python.org/
    pause
    exit /b 1
)

echo Installing frontend dependencies...
npm install

if %errorlevel% neq 0 (
    echo Error: Failed to install Node.js dependencies.
    pause
    exit /b 1
)

echo.
echo Setting up Python backend...
cd backend

echo Creating Python virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo Error: Failed to install Python dependencies.
    pause
    exit /b 1
)

cd ..

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

echo.
echo ============================================
echo Setup completed successfully!
echo ============================================
echo.
echo To start the development environment:
echo.
echo 1. Start PostgreSQL and Redis (recommended with Docker):
echo    docker run -d --name postgres-dataviz -p 5432:5432 -e POSTGRES_DB=dataviz -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password postgres:15
echo    docker run -d --name redis-dataviz -p 6379:6379 redis:7-alpine
echo.
echo 2. Start the backend server:
echo    cd backend
echo    venv\Scripts\activate
echo    uvicorn main:app --reload
echo.
echo 3. Start the frontend (in a new terminal):
echo    npm run dev
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
