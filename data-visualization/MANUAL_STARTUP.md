# 🚀 Manual Startup Guide for Steel Production Dashboard

## Current Status
✅ Virtual environment created at: `L:\projects\DataViz\data-visualization\backend\venv`
✅ Python packages installing/installed
✅ Frontend packages installing/installed
✅ Simplified backend created: `main_simple.py`

## Manual Startup Steps

### Step 1: Start the Backend
Open Command Prompt and run:
```cmd
cd "L:\projects\DataViz\data-visualization\backend"
venv\Scripts\activate
python main_simple.py
```

You should see:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Step 2: Start the Frontend (New Terminal)
Open a NEW Command Prompt and run:
```cmd
cd "L:\projects\DataViz\data-visualization"
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 3: Access the Dashboard
1. Open your browser
2. Go to: http://localhost:3000
3. Click on "Steel Production Dashboard"

## 🎯 What You'll See

### ✅ Working Features:
- Steel Production Dashboard interface
- Chart components and layouts
- Data type switching (Steel Production, Efficiency, Quality)
- Sample data visualization

### ⚠️ Limited Features (without WebSocket):
- No real-time updates (refresh page to see new data)
- Data comes from backend API calls instead of live streaming

## 🔧 Troubleshooting

### Backend Issues:
```cmd
# Check if FastAPI is installed
cd "L:\projects\DataViz\data-visualization\backend"
venv\Scripts\activate
pip list | findstr fastapi
```

### Frontend Issues:
```cmd
# Check if packages are installed
cd "L:\projects\DataViz\data-visualization"
npm list --depth=0
```

### Port Conflicts:
- Backend: Change port in `main_simple.py` (line 142: `uvicorn.run(app, host="0.0.0.0", port=8001)`)
- Frontend: `npm run dev -- -p 3001`

## 🎊 Success Indicators

### Backend Running:
- Visit: http://localhost:8000
- Should show: `{"message": "Steel Production Dashboard API is running!", "status": "online"}`

### Frontend Running:
- Visit: http://localhost:3000
- Should show the main dashboard page

### API Working:
- Visit: http://localhost:8000/api/v1/data/real-time/steel_production
- Should show JSON data for steel production

## 📊 Testing the Dashboard

Once both are running:
1. Go to http://localhost:3000/real-time-dashboard
2. Use the dropdown to switch between:
   - Steel Production Volume
   - Production Efficiency  
   - Quality Metrics
3. Refresh the page to see new random data

---

## Next Steps After Basic Setup

1. **Add Real-time WebSocket**: Install missing packages for live updates
2. **Add Database**: Install PostgreSQL for data persistence
3. **Import Your CSV**: Use your steel_production.csv data
4. **Customize Charts**: Modify colors, layouts, and metrics

**You're almost there! 🎉**
