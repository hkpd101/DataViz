# 🏭 Steel Production Analytics Dashboard

A comprehensive real-time monitoring and analytics platform for steel manufacturing operations, built with modern web technologies.

## ✨ Features

### 📊 Real-Time Monitoring
- **Live Steel Production Tracking**: Monitor 8 different steel types with production targets
- **Equipment Performance**: Real-time status monitoring of 6 major production units
- **Environmental Metrics**: CO₂ emissions, water usage, and sustainability tracking
- **Quality Assurance**: Comprehensive material quality and compliance monitoring

### 🎯 Analytics Dashboards
1. **Production Control Center** - Live steel production tracking and performance
2. **Efficiency Analytics** - Performance optimization and energy monitoring
3. **Quality Assurance** - Material quality standards and customer satisfaction
4. **Environmental Monitor** - Emissions tracking and sustainability metrics
5. **Equipment Performance** - Machinery health and predictive maintenance
6. **Production Trends** - Historical analytics and forecasting
7. **Cost Analysis** - Financial performance and ROI tracking
8. **Executive Summary** - KPI dashboard and executive reports

### 📈 Data Visualization
- Interactive charts built with Recharts
- Real-time WebSocket data streaming
- Glass morphism UI design
- Responsive layout for all screen sizes
- 30+ key performance indicators

## 🚀 Tech Stack

### Frontend
- **Next.js 13.5.6** - React framework with App Router
- **React 18** - Component library
- **Styled Components** - CSS-in-JS styling
- **Recharts** - Data visualization
- **WebSocket** - Real-time data streaming

### Backend
- **FastAPI** - Python web framework
- **WebSocket** - Real-time communication
- **Python 3.8+** - Backend language

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd data-visualization
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up backend environment**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # macOS/Linux
   pip install -r requirements-simple.txt
   ```

4. **Start the application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   venv\Scripts\activate
   python main_simple.py
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🌐 Deployment

### 🚀 Quick Railway Deployment
```bash
# Run the interactive deployment guide
railway-deploy.bat
```

### 📋 Manual Deployment Steps

**Deploy to Railway (Recommended):**

1. **Backend Service:**
   - Go to [railway.app](https://railway.app) and sign up
   - Create new project from GitHub repo
   - Set root directory to `backend`
   - Deploy automatically

2. **Frontend Service:**
   - Add new service to same Railway project
   - Use same repository, set root directory to `.`
   - Add environment variables:
     - `NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app`
     - `NEXT_PUBLIC_WS_URL=wss://your-backend-url.railway.app/ws`

📖 **Detailed Guide**: See [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md) for complete instructions.

### 🎯 Alternative Platforms
- **Vercel** (Frontend) + **Railway** (Backend)
- **Netlify** (Frontend) + **Render** (Backend)
- **Heroku** (Full stack)

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**
- `python main_simple.py` - Start backend server

### Project Structure

```
data-visualization/
├── backend/                    # FastAPI backend
│   ├── main_simple.py         # Main backend application
│   ├── requirements-simple.txt# Python dependencies
│   └── venv/                  # Python virtual environment
├── pages/                     # Next.js pages
│   ├── index.js              # Homepage
│   ├── real-time-dashboard.js # Main dashboard
│   ├── _app.js               # App wrapper
│   └── _document.js          # HTML document
├── src/                      # Frontend source code
│   ├── components/           # React components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services
│   ├── style/               # Global styles
│   └── utility/             # Utility functions
├── public/                   # Static assets
├── datasets/                 # Sample data files
└── package.json             # Frontend dependencies
```

## 📊 Data Schema

### Steel Production Data
```javascript
{
  steel_production: {
    data: [
      {
        category: "Crude Steel",
        value: 1950,
        unit: "tons",
        target: 2000
      }
      // ... more steel types
    ],
    total_production: 5110,
    efficiency_rating: "High"
  }
}
```

### Equipment Performance Data
```javascript
{
  equipment_performance: {
    data: [
      {
        equipment: "Blast Furnace #1",
        efficiency: 94.2,
        temperature: 1520,
        status: "Operational"
      }
      // ... more equipment
    ]
  }
}
```

## 🔌 API Endpoints

### REST Endpoints
- `GET /` - Health check
- `GET /health` - Detailed health status
- `GET /api/v1/data/real-time/{data_type}` - Get current real-time data
- `GET /api/v1/data/historical/{data_type}` - Get historical data
- `GET /api/v1/data/summary/{data_type}` - Get data summary

### WebSocket Endpoints
- `WS /ws/{client_id}` - Real-time data streaming

## 🎨 UI Features

- **Glass Morphism Design** - Modern translucent UI elements
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Real-time Updates** - Live data refresh every 2 seconds
- **Interactive Charts** - Hover effects and detailed tooltips
- **Status Indicators** - Color-coded performance metrics
- **Toast Notifications** - Connection status updates

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Backend (Heroku/Railway)
1. Create `Procfile`: `web: uvicorn main_simple:app --host 0.0.0.0 --port $PORT`
2. Deploy to your preferred platform
3. Update frontend environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Hrithik P Gowda**
- Created: 2025
- Email: hrithik.pgowda@example.com
- GitHub: [@hrithikpgowda](https://github.com/hrithikpgowda)

---

Built with ❤️ for the steel manufacturing industry by Hrithik P Gowda

## 🔧 Troubleshooting

### Common Issues

**WebSocket connection issues:**
- Ensure backend is running on port 8000
- Check CORS settings in `main_simple.py`
- Verify no firewall blocking WebSocket connections

**Charts not displaying data:**
- Check browser console for errors
- Verify backend is serving data at WebSocket endpoint
- Ensure data format matches expected schema

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 16+)
- Clear `.next` folder and rebuild

---

Built with ❤️ for the steel manufacturing industry by Hrithik P Gowda

## 📸 Screenshots


### 1. Homepage Dashboard
- Modern glass morphism design
- 8 specialized dashboard cards
- Real-time status indicators
- Navigation to detailed views

### 2. Real-Time Production Dashboard
- Live steel production monitoring
- Interactive charts with WebSocket data
- Equipment performance tracking
- Environmental metrics display

### 3. Equipment Performance Monitor
- Color-coded efficiency bars
- Status indicators (Operational, Maintenance, Warning)
- Temperature and performance metrics
- Real-time equipment health monitoring
