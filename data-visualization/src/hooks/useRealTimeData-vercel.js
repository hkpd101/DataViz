import { useState, useEffect } from 'react';

export const useRealTimeData = (clientId) => {
  const [data, setData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Simulated');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const mockData = {
        steel_production: {
          data: [
            { category: "Crude Steel", value: Math.floor(Math.random() * 400) + 1800, target: 2000 },
            { category: "Finished Steel", value: Math.floor(Math.random() * 300) + 1300, target: 1500 },
            { category: "Hot Rolled", value: Math.floor(Math.random() * 200) + 800, target: 900 },
            { category: "Cold Rolled", value: Math.floor(Math.random() * 100) + 300, target: 350 },
          ]
        },
        production_efficiency: {
          data: {
            furnace_efficiency: Math.round((Math.random() * 5 + 90) * 10) / 10,
            energy_consumption: Math.floor(Math.random() * 70) + 450,
            yield_rate: Math.round((Math.random() * 5 + 88) * 10) / 10,
            maintenance_score: Math.round((Math.random() * 7 + 85) * 10) / 10,
          }
        },
        quality_metrics: {
          data: {
            defect_rate: Math.round((Math.random() * 0.7 + 0.5) * 10) / 10,
            tensile_strength: Math.floor(Math.random() * 30) + 470,
            surface_quality: Math.round((Math.random() * 3 + 96) * 10) / 10,
            customer_satisfaction: Math.round((Math.random() * 4 + 92) * 10) / 10,
          }
        },
        timestamp: new Date().toISOString()
      };
      
      setData(mockData);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return { data, connectionStatus, isConnected };
};
