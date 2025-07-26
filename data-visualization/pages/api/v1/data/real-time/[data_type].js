import { generate_steel_data } from './utils';

export default function handler(req, res) {
  const { data_type } = req.query;
  
  const mockData = {
    steel_production: {
      data: [
        { category: "Crude Steel", value: 1950, target: 2000 },
        { category: "Finished Steel", value: 1420, target: 1500 },
        { category: "Hot Rolled", value: 890, target: 900 },
        { category: "Cold Rolled", value: 340, target: 350 },
      ]
    },
    production_efficiency: {
      data: {
        furnace_efficiency: 92.5,
        energy_consumption: 485,
        yield_rate: 91.2,
        maintenance_score: 88.5,
      }
    },
    quality_metrics: {
      data: {
        defect_rate: 0.8,
        tensile_strength: 485,
        surface_quality: 98.5,
        customer_satisfaction: 94.2,
      }
    }
  };

  const data = mockData[data_type] || { data: {} };
  
  res.status(200).json({
    status: "success",
    data_type,
    ...data,
    timestamp: new Date().toISOString()
  });
}
