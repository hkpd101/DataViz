# 🚂 Railway Full Stack Deployment Guide

## Complete Step-by-Step Railway Deployment

Railway is perfect for full-stack deployment as it can handle both your Python backend and Next.js frontend.

### 🏁 Quick Start

**Run the interactive guide:**
```bash
railway-deploy.bat  # Windows
```

---

## 📋 Prerequisites

- ✅ GitHub account with your code pushed
- ✅ Railway account (free at [railway.app](https://railway.app))
- ✅ Project files ready for deployment

---

## 🔧 Step 1: Deploy Backend Service

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub account
3. Verify your email

### 1.2 Deploy Backend
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `data-visualization` repository
4. **IMPORTANT**: Set **Root Directory** to `backend`
5. Click **"Deploy"**

### 1.3 Backend Configuration
Railway will automatically:
- ✅ Detect Python application
- ✅ Install dependencies from `requirements-simple.txt`
- ✅ Use `Procfile` for startup command
- ✅ Provide HTTPS endpoint

**Your backend will be available at:**
`https://backend-production-xxxx.up.railway.app`

---

## 🎨 Step 2: Deploy Frontend Service

### 2.1 Add Frontend Service
1. In the **same Railway project**, click **"New Service"**
2. Select **"GitHub Repo"**
3. Choose the **same repository** again
4. **IMPORTANT**: Set **Root Directory** to `.` (project root)
5. Click **"Deploy"**

### 2.2 Frontend Configuration
Railway will automatically:
- ✅ Detect Next.js application  
- ✅ Install dependencies from `package.json`
- ✅ Build with `npm run build`
- ✅ Start with `npm start`

**Your frontend will be available at:**
`https://frontend-production-xxxx.up.railway.app`

---

## 🔐 Step 3: Configure Environment Variables

### 3.1 Frontend Environment Variables
1. Go to your **Frontend service** in Railway
2. Click **"Variables"** tab
3. Add these variables:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-railway-url.up.railway.app
NEXT_PUBLIC_WS_URL=wss://your-backend-railway-url.up.railway.app/ws
```

**Example:**
```bash
NEXT_PUBLIC_API_URL=https://backend-production-a1b2c3.up.railway.app
NEXT_PUBLIC_WS_URL=wss://backend-production-a1b2c3.up.railway.app/ws
```

### 3.2 Redeploy Frontend
1. After adding variables, click **"Redeploy"**
2. Wait for deployment to complete

---

## 🧪 Step 4: Test Your Deployment

### 4.1 Backend Health Check
Visit: `https://your-backend-url.railway.app/health`
Expected response: `{"status":"healthy","version":"1.0.0"}`

### 4.2 Backend API Documentation
Visit: `https://your-backend-url.railway.app/docs`
Should show FastAPI interactive documentation

### 4.3 Frontend Application
Visit: `https://your-frontend-url.railway.app`
Should load the Steel Production Dashboard

### 4.4 Integration Test
- ✅ Navigate through all dashboard views
- ✅ Verify charts display data
- ✅ Test real-time WebSocket connections
- ✅ Check mobile responsiveness

---

## 🌐 Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain
1. Go to your Frontend service
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed

---

## 🔧 Configuration Files Created

All necessary files are ready:

**Backend (`/backend/`):**
- ✅ `Procfile` - Railway startup command
- ✅ `railway.toml` - Railway configuration
- ✅ `requirements-simple.txt` - Python dependencies
- ✅ `runtime.txt` - Python version

**Frontend (`/`):**
- ✅ `railway.toml` - Next.js Railway config
- ✅ `package.json` - Node.js dependencies
- ✅ Updated CORS settings

---

## 🚨 Troubleshooting

### Common Issues:

**1. Frontend not connecting to backend:**
- ✅ Check environment variables are set correctly
- ✅ Ensure backend URL doesn't have trailing slash
- ✅ Verify WebSocket URL uses `wss://` not `ws://`

**2. Build failures:**
- ✅ Check Railway logs in the dashboard
- ✅ Verify all dependencies are in package.json
- ✅ Ensure correct root directory is set

**3. CORS errors:**
- ✅ Backend is configured to allow all origins
- ✅ If issues persist, check Railway logs

**4. WebSocket connection issues:**
- ✅ Ensure WSS protocol for production
- ✅ Check browser console for errors
- ✅ Verify backend WebSocket endpoint works

---

## 📊 Railway Benefits

✅ **Free Tier**: Great for development and small projects
✅ **Auto HTTPS**: Automatic SSL certificates
✅ **GitHub Integration**: Auto-deploy on git push
✅ **Environment Variables**: Easy configuration
✅ **Logs & Monitoring**: Built-in application monitoring
✅ **Scaling**: Easy to scale up when needed

---

## 🎉 Success!

Once deployed, you'll have:
- 🌐 **Global Access**: Worldwide accessibility
- 📱 **Mobile Ready**: Responsive on all devices  
- 🔄 **Real-time**: Live WebSocket connections
- 🔒 **Secure**: HTTPS enabled
- 📈 **Scalable**: Ready for more users

**Share your dashboard URL with the world!** 🚀

---

## 📞 Need Help?

- 📚 Check Railway documentation: [docs.railway.app](https://docs.railway.app)
- 💬 Railway Discord community
- 📧 Railway support team
- 📖 Review our `DEPLOYMENT.md` for alternatives
