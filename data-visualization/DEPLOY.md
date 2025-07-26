# 🚀 Steel Production Dashboard - Deployment Guide

## Quick Deploy to Vercel + Railway

### Step 1: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `hkpd101/DataViz`
4. Deploy! ✨

### Step 2: Deploy Backend to Railway
1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Set **Root Directory**: `/backend`
5. Deploy! 🚂

### Step 3: Connect Frontend to Backend
1. Copy your Railway backend URL
2. Update Vercel environment variables:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend.railway.app`
   - `NEXT_PUBLIC_WS_URL`: `wss://your-backend.railway.app`

## Local Development
```bash
# Frontend
npm install
npm run dev

# Backend (in separate terminal)
cd backend
pip install -r requirements-simple.txt
python main_simple.py
```

## Environment Variables
- **NEXT_PUBLIC_API_URL**: Backend API URL
- **NEXT_PUBLIC_WS_URL**: WebSocket URL for real-time data

---
**Created by Hrithik P Gowda** 🏭
