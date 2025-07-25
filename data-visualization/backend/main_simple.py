"""
Steel Production Dashboard API
Advanced real-time monitoring and analytics platform for steel manufacturing
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import random
import os
from datetime import datetime
from typing import Dict, Any

# Initialize FastAPI application
app = FastAPI(
    title="Steel Production Dashboard API",
    description="Advanced steel production monitoring and analytics platform - Created by Hrithik P Gowda",
    version="1.0.0",
    contact={
        "name": "Hrithik P Gowda",
        "email": "hrithik.pgowda@example.com",
    }
)

# CORS middleware configuration for both development and production
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001", 
    "http://127.0.0.1:3000",
    "https://*.vercel.app",
    "https://*.netlify.app",
    "https://*.railway.app",
    "https://*.render.com"
]

# Add environment-specific origins
if os.getenv("FRONTEND_URL"):
    allowed_origins.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For deployment, you might want to be more specific
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_steel_production_data() -> Dict[str, Any]:
    """Generate comprehensive steel production data with realistic patterns"""
    current_time = datetime.now().isoformat()
    
    # More comprehensive steel production with regional and seasonal variations
    base_hour = datetime.now().hour
    seasonal_multiplier = 1.1 if 6 <= base_hour <= 18 else 0.9  # Day vs night shift
    
    steel_production = {
        "type": "steel_production",
        "timestamp": current_time,
        "data": [
            {"category": "Crude Steel", "value": random.uniform(1800, 2100) * seasonal_multiplier, "unit": "tons", "target": 2000},
            {"category": "Finished Steel", "value": random.uniform(1350, 1650) * seasonal_multiplier, "unit": "tons", "target": 1500},
            {"category": "Hot Rolled", "value": random.uniform(800, 1000) * seasonal_multiplier, "unit": "tons", "target": 900},
            {"category": "Cold Rolled", "value": random.uniform(280, 400) * seasonal_multiplier, "unit": "tons", "target": 350},
            {"category": "Galvanized", "value": random.uniform(160, 240) * seasonal_multiplier, "unit": "tons", "target": 200},
            {"category": "Stainless Steel", "value": random.uniform(110, 170) * seasonal_multiplier, "unit": "tons", "target": 140},
            {"category": "Alloy Steel", "value": random.uniform(90, 130) * seasonal_multiplier, "unit": "tons", "target": 110},
            {"category": "Tool Steel", "value": random.uniform(45, 75) * seasonal_multiplier, "unit": "tons", "target": 60},
        ],
        "total_production": 0,
        "efficiency_rating": "High" if seasonal_multiplier > 1.0 else "Normal"
    }
    
    # Calculate total production
    steel_production["total_production"] = sum(item["value"] for item in steel_production["data"])

    # Enhanced production efficiency with more metrics
    production_efficiency = {
        "type": "production_efficiency",
        "timestamp": current_time,
        "data": {
            "furnace_efficiency": random.uniform(85, 95),
            "energy_consumption": random.uniform(450, 550),
            "yield_rate": random.uniform(88, 94),
            "downtime_hours": random.uniform(0.5, 3.5),
            "maintenance_score": random.uniform(75, 95),
            "operator_efficiency": random.uniform(80, 98),
            "raw_material_utilization": random.uniform(85, 96),
            "production_speed": random.uniform(90, 110),  # % of target speed
            "quality_compliance": random.uniform(92, 99.5),
            "safety_incidents": random.randint(0, 2),
            "cost_per_ton": random.uniform(450, 650),
        }
    }

    # Enhanced quality metrics with industry standards
    quality_metrics = {
        "type": "quality_metrics",
        "timestamp": current_time,
        "data": {
            "defect_rate": random.uniform(0.3, 2.5),
            "tensile_strength": random.uniform(370, 520),
            "carbon_content": random.uniform(0.15, 0.85),  # Wider range for different steel types
            "surface_quality": random.uniform(92, 99.2),
            "hardness_hrc": random.uniform(20, 65),  # Rockwell C hardness
            "elongation_percent": random.uniform(15, 35),
            "impact_resistance": random.uniform(25, 180),  # Joules
            "corrosion_resistance": random.uniform(7, 9.5),  # Scale 1-10
            "dimensional_accuracy": random.uniform(95, 99.8),  # Percentage
            "coating_thickness": random.uniform(15, 85),  # Micrometers for galvanized
            "customer_satisfaction": random.uniform(85, 98),
        }
    }
    
    # New: Environmental metrics
    environmental_metrics = {
        "type": "environmental_metrics",
        "timestamp": current_time,
        "data": {
            "co2_emissions": random.uniform(1.8, 2.4),  # Tons CO2 per ton steel
            "water_usage": random.uniform(3.5, 6.2),  # Cubic meters per ton
            "energy_intensity": random.uniform(18, 25),  # GJ per ton
            "waste_recycled": random.uniform(85, 96),  # Percentage
            "air_quality_index": random.uniform(45, 85),
            "noise_level": random.uniform(65, 85),  # Decibels
            "dust_emissions": random.uniform(0.1, 0.8),  # kg per ton
            "water_temperature": random.uniform(15, 35),  # Celsius
        }
    }
    
    # New: Equipment performance
    equipment_performance = {
        "type": "equipment_performance",
        "timestamp": current_time,
        "data": [
            {"equipment": "Blast Furnace #1", "efficiency": random.uniform(88, 96), "temperature": random.uniform(1450, 1550), "status": "Operational"},
            {"equipment": "Blast Furnace #2", "efficiency": random.uniform(85, 94), "temperature": random.uniform(1460, 1540), "status": "Operational"},
            {"equipment": "Rolling Mill A", "efficiency": random.uniform(90, 98), "speed": random.uniform(180, 220), "status": "Operational"},
            {"equipment": "Rolling Mill B", "efficiency": random.uniform(87, 95), "speed": random.uniform(175, 210), "status": "Maintenance" if random.random() < 0.1 else "Operational"},
            {"equipment": "Galvanizing Line", "efficiency": random.uniform(92, 97), "coating_rate": random.uniform(85, 105), "status": "Operational"},
            {"equipment": "Quality Scanner", "efficiency": random.uniform(96, 99.5), "scan_rate": random.uniform(95, 100), "status": "Operational"},
        ]
    }

    return {
        "timestamp": current_time,
        "steel_production": steel_production,
        "production_efficiency": production_efficiency,
        "quality_metrics": quality_metrics,
        "environmental_metrics": environmental_metrics,
        "equipment_performance": equipment_performance
    }

@app.get("/")
async def root():
    return {"message": "Steel Production Dashboard API is running!", "status": "online"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

@app.get("/api/v1/data/real-time/{data_type}")
async def get_real_time_data(data_type: str):
    """Get current real-time data point"""
    try:
        full_data = generate_steel_production_data()
        
        if data_type in full_data:
            return {
                "status": "success",
                "timestamp": full_data["timestamp"],
                "data": full_data[data_type]
            }
        else:
            return {"status": "error", "message": f"Data type '{data_type}' not found"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/api/v1/data/historical/{data_type}")
async def get_historical_data(data_type: str, limit: int = 100):
    """Get historical data for visualization"""
    try:
        historical_data = []
        
        for i in range(min(limit, 50)):  # Limit to 50 for demo
            if data_type == "steel_production":
                data_point = {
                    "timestamp": datetime.now().isoformat(),
                    "crude_steel": random.uniform(1800, 2100),
                    "finished_steel": random.uniform(1350, 1650),
                    "hot_rolled": random.uniform(800, 1000),
                    "cold_rolled": random.uniform(280, 400),
                    "galvanized": random.uniform(160, 240),
                    "stainless": random.uniform(110, 170)
                }
            elif data_type == "production_efficiency":
                data_point = {
                    "timestamp": datetime.now().isoformat(),
                    "furnace_efficiency": random.uniform(85, 95),
                    "energy_consumption": random.uniform(450, 550),
                    "yield_rate": random.uniform(88, 94),
                    "downtime_hours": random.uniform(0.5, 3.5)
                }
            elif data_type == "quality_metrics":
                data_point = {
                    "timestamp": datetime.now().isoformat(),
                    "defect_rate": random.uniform(0.5, 2.5),
                    "tensile_strength": random.uniform(370, 520),
                    "carbon_content": random.uniform(0.15, 0.25),
                    "surface_quality": random.uniform(92, 98)
                }
            else:
                data_point = {
                    "timestamp": datetime.now().isoformat(),
                    "value": random.uniform(0, 100)
                }
            
            historical_data.append(data_point)
        
        return {
            "status": "success",
            "data_type": data_type,
            "count": len(historical_data),
            "data": historical_data
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/api/v1/data/summary/{data_type}")
async def get_data_summary(data_type: str):
    """Get summary statistics for data type"""
    return {
        "status": "success",
        "data_type": data_type,
        "summary": {
            "total_records": 100,
            "last_updated": datetime.now().isoformat()
        }
    }

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    """WebSocket endpoint for real-time data streaming"""
    await websocket.accept()
    try:
        while True:
            # Generate and send real-time data every 2 seconds
            data = generate_steel_production_data()
            await websocket.send_text(json.dumps(data))
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        print(f"Client {client_id} disconnected")
    except Exception as e:
        print(f"WebSocket error for client {client_id}: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
