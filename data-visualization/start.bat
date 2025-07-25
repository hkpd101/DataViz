@echo off
echo Starting Real-time Data Visualization Dashboard...
echo.

REM Check if Docker is running
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not installed or not running.
    echo Please install Docker Desktop and make sure it's running.
    pause
    exit /b 1
)

echo Docker detected. Starting services...
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

REM Start all services with Docker Compose
echo Starting all services with Docker Compose...
docker-compose up -d

if %errorlevel% neq 0 (
    echo Error: Failed to start services with Docker Compose.
    echo Trying to start services individually...
    
    REM Try starting databases first
    echo Starting PostgreSQL...
    docker run -d --name postgres-dataviz -p 5432:5432 -e POSTGRES_DB=dataviz -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password postgres:15
    
    echo Starting Redis...
    docker run -d --name redis-dataviz -p 6379:6379 redis:7-alpine
    
    echo.
    echo Database services started. You may need to start the backend and frontend manually:
    echo.
    echo Backend: cd backend && pip install -r requirements.txt && uvicorn main:app --reload
    echo Frontend: npm install && npm run dev
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo Services starting... Please wait...
echo ============================================
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:8000
echo API Documentation will be available at: http://localhost:8000/docs
echo.

REM Wait for services to start
echo Waiting for services to initialize...
timeout /t 10 /nobreak >nul

REM Check if services are running
echo Checking service status...
docker-compose ps

echo.
echo ============================================
echo Dashboard is ready!
echo ============================================
echo.
echo Next steps:
echo 1. Open http://localhost:3000 in your browser
echo 2. Navigate to "Real-time Data Visualization Dashboard"
echo 3. Watch the live data streaming in action!
echo.
echo To stop all services, run: docker-compose down
echo.
pause
