# 🚀 Steel Production Dashboard - Startup Guide

## Quick Start (Choose One Option)

### Option 1: With Docker (Recommended if Docker is installed)
1. Open Command Prompt or PowerShell as Administrator
2. Navigate to the project directory:
   ```cmd
   cd "L:\projects\DataViz\data-visualization"
   ```
3. Start all services:
   ```cmd
   docker-compose up -d
   ```
4. Open your browser and go to: http://localhost:3000

### Option 2: Manual Development Setup (Frontend Only)
1. Open Command Prompt or PowerShell
2. Navigate to the project directory:
   ```cmd
   cd "L:\projects\DataViz\data-visualization"
   ```
3. Install dependencies:
   ```cmd
   npm install
   ```
4. Start the frontend:
   ```cmd
   npm run dev
   ```
5. Open your browser and go to: http://localhost:3000

### Option 3: Complete Manual Setup (Frontend + Backend)

#### Step 1: Start Frontend
```cmd
cd "L:\projects\DataViz\data-visualization"
npm install
npm run dev
```

#### Step 2: Start Backend (in a new terminal)
```cmd
cd "L:\projects\DataViz\data-visualization\backend"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Step 3: Start Database Services (optional - for full functionality)
```cmd
# PostgreSQL
docker run -d --name postgres-steel -p 5432:5432 -e POSTGRES_DB=dataviz -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password postgres:15

# Redis
docker run -d --name redis-steel -p 6379:6379 redis:7-alpine
```

## 🎯 What You'll See

### Frontend Only (Option 2)
- ✅ Steel Production Dashboard interface
- ✅ Chart components and layout
- ✅ Interactive controls
- ❌ Real-time data (will show placeholder)
- ❌ WebSocket connection
- ❌ Data export functionality

### Full Setup (Option 1 or 3)
- ✅ Complete steel production dashboard
- ✅ Real-time data streaming
- ✅ WebSocket connections
- ✅ Data export (CSV)
- ✅ All interactive features

## 📊 Dashboard Features

Once running, you can:

1. **View Steel Production Data**
   - Navigate to http://localhost:3000
   - Click on "Steel Production Dashboard"

2. **Switch Between Data Types**
   - Steel Production Volume
   - Production Efficiency  
   - Quality Metrics

3. **Real-time Monitoring** (with backend)
   - Live chart updates every 5 seconds
   - Connection status indicators
   - Toast notifications

4. **Export Data** (with backend)
   - Download CSV files
   - Historical data analysis

## 🛠️ Troubleshooting

### Common Issues:
1. **Port 3000 already in use**
   - Kill the process: `netstat -ano | findstr :3000`
   - Or use a different port: `npm run dev -- -p 3001`

2. **Dependencies not installed**
   - Run: `npm install`
   - For backend: `pip install -r requirements.txt`

3. **Docker not running**
   - Start Docker Desktop
   - Or use Option 2 (Frontend Only)

## 🎊 Success Indicators

### Frontend Started Successfully:
```
Ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Backend Started Successfully:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

## 📱 Access Points

- **Main Dashboard**: http://localhost:3000
- **Steel Production Dashboard**: http://localhost:3000/real-time-dashboard
- **API Documentation**: http://localhost:8000/docs (with backend)
- **Health Check**: http://localhost:8000/health (with backend)

---

## 🎯 Next Steps

1. **Start with Option 2** (Frontend Only) to see the interface
2. **Upgrade to Option 1 or 3** for full functionality
3. **Customize with your data** by adding CSV files to the `datasets/` folder

**Happy Steel Production Monitoring! 🏭📊**
