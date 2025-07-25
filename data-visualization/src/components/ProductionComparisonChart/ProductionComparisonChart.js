import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
`;

const StatusIndicator = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'connected',
})`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.connected ? '#4CAF50' : '#f44336'};
    animation: ${props => props.connected ? 'pulse 2s infinite' : 'none'};
  }
  
  .status-text {
    font-size: 0.9rem;
    color: #666;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const efficiency = Math.round((data.actual / data.target) * 100);
    
    return (
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#333' }}>{label}</p>
        <p style={{ margin: '4px 0', color: '#8884d8' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#8884d8', marginRight: '6px' }}></span>
          Actual: {data.actual} tons
        </p>
        <p style={{ margin: '4px 0', color: '#82ca9d' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#82ca9d', marginRight: '6px' }}></span>
          Target: {data.target} tons
        </p>
        <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: efficiency >= 100 ? '#4CAF50' : efficiency >= 90 ? '#FF9800' : '#f44336' }}>
          Efficiency: {efficiency}%
        </p>
      </div>
    );
  }
  return null;
};

const ProductionComparisonChart = ({ 
  title, 
  data = [],
  height = 300,
  isConnected = false 
}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const transformedData = data.map(item => ({
        category: item.category,
        actual: item.value,
        target: item.target,
        efficiency: Math.round((item.value / item.target) * 100)
      }));
      setChartData(transformedData);
    }
  }, [data]);

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>{title}</ChartTitle>
        <StatusIndicator connected={isConnected}>
          <div className="status-dot" />
          <span className="status-text">
            {isConnected ? 'Live' : 'Disconnected'}
          </span>
        </StatusIndicator>
      </ChartHeader>
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Production (tons)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="actual" 
            name="Actual Production"
            fill="#8884d8"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            dataKey="target" 
            name="Target Production"
            fill="#82ca9d"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ProductionComparisonChart;
