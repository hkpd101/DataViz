from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json
import random
from datetime import datetime

app = FastAPI()

def generate_steel_data():
    return {
        "steel_production": {
            "data": [
                {"category": "Crude Steel", "value": random.randint(1800, 2200), "target": 2000},
                {"category": "Finished Steel", "value": random.randint(1300, 1600), "target": 1500},
                {"category": "Hot Rolled", "value": random.randint(800, 1000), "target": 900},
                {"category": "Cold Rolled", "value": random.randint(300, 400), "target": 350},
            ]
        },
        "production_efficiency": {
            "data": {
                "furnace_efficiency": round(random.uniform(90, 95), 1),
                "energy_consumption": random.randint(450, 520),
                "yield_rate": round(random.uniform(88, 93), 1),
                "maintenance_score": round(random.uniform(85, 92), 1),
            }
        },
        "quality_metrics": {
            "data": {
                "defect_rate": round(random.uniform(0.5, 1.2), 1),
                "tensile_strength": random.randint(470, 500),
                "surface_quality": round(random.uniform(96, 99), 1),
                "customer_satisfaction": round(random.uniform(92, 96), 1),
            }
        },
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/v1/data/real-time/{data_type}")
def get_data(data_type: str):
    data = generate_steel_data()
    return {"status": "success", "data": data.get(data_type, {})}

@app.get("/api/v1/data/summary/{data_type}")
def get_summary(data_type: str):
    return {
        "status": "success",
        "data_type": data_type,
        "summary": {"total_records": 100, "last_updated": datetime.now().isoformat()}
    }

@app.get("/")
def root():
    return {"message": "Steel Production API", "status": "online"}
