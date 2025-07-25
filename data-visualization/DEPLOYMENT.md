# 🚀 Deployment Guide - Steel Production Analytics Dashboard

This guide will help you deploy your Steel Production Analytics Dashboard so others can access it online.

## 📋 Prerequisites

- GitHub account
- Node.js 16+ installed
- Python 3.8+ installed
- Git installed

## 🎯 Recommended Deployment Strategy

**Frontend:** Vercel (Free tier available)
**Backend:** Railway.app (Free tier available)

## 🔧 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder as root
   - Railway will automatically detect it's a Python app

3. **Configure Environment Variables** (if needed)
   - Go to your project dashboard
   - Click "Variables" tab
   - Add any required environment variables

4. **Get Your Backend URL**
   - After deployment, you'll get a URL like: `https://your-app-name.railway.app`
   - Save this URL - you'll need it for the frontend

### Step 3: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js app
   - Set the root directory to your project folder (not the backend folder)

3. **Configure Environment Variables**
   - In the deployment settings, add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-railway-url.railway.app
     NEXT_PUBLIC_WS_URL=wss://your-backend-railway-url.railway.app/ws
     ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be available at: `https://your-project-name.vercel.app`

## 🔄 Alternative Deployment Options

### Option 1: Both on Railway

1. Deploy backend first (follow Step 2 above)
2. Create a new Railway project for frontend
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Set environment variables with your backend Railway URL

### Option 2: Netlify (Frontend Alternative)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your build folder or connect to GitHub
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables

### Option 3: Render.com (Full Stack)

1. Create account at [render.com](https://render.com)
2. Deploy backend as "Web Service"
3. Deploy frontend as "Static Site"

## 🐳 Docker Deployment (Advanced)

### Backend Dockerfile
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements-simple.txt .
RUN pip install -r requirements-simple.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main_simple:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Update CORS settings in `main_simple.py` for production
3. **HTTPS**: Ensure your deployment platform uses HTTPS
4. **API Keys**: Store sensitive data in environment variables

## 📊 Monitoring & Analytics

- Add error tracking (Sentry)
- Set up monitoring (Railway/Vercel built-in)
- Monitor API usage and performance

## 🎉 Post-Deployment Checklist

- [ ] Backend is accessible and returning data
- [ ] Frontend loads without errors
- [ ] WebSocket connections work
- [ ] All charts display data correctly
- [ ] Mobile responsiveness works
- [ ] HTTPS is enabled
- [ ] Domain name configured (optional)

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Update allowed origins in `main_simple.py`
2. **WebSocket Failures**: Check WSS vs WS protocol
3. **Build Failures**: Check Node.js version compatibility
4. **API Timeouts**: Verify backend is running and accessible

### Debug Steps:
1. Check browser console for errors
2. Verify environment variables are set
3. Test API endpoints directly
4. Check deployment logs

## 🌐 Custom Domain (Optional)

### For Vercel:
1. Go to project settings
2. Add custom domain
3. Update DNS records

### For Railway:
1. Go to project settings
2. Add custom domain
3. Update DNS records

## 📞 Need Help?

- Check deployment platform documentation
- Review error logs in deployment dashboard
- Test locally first with production environment variables

---

**Your Steel Production Analytics Dashboard is now ready to be accessed by users worldwide! 🚀**

Share the URL with your team and start monitoring steel production in real-time.
