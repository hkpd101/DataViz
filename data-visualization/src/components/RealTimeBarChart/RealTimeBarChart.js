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
  justify-content: between;
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

const RealTimeBarChart = ({ 
  title, 
  dataStream, 
  xKey = 'category', 
  yKey = 'value',
  height = 300,
  isConnected = false 
}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (dataStream) {
      if (Array.isArray(dataStream)) {
        // If dataStream is directly an array
        setChartData(dataStream);
      } else if (dataStream.data && Array.isArray(dataStream.data)) {
        // If dataStream has a data property that's an array
        setChartData(dataStream.data);
      } else if (typeof dataStream.data === 'object') {
        // Convert object to array format
        const dataArray = Object.entries(dataStream.data).map(([key, value]) => ({
          [xKey]: key,
          [yKey]: value
        }));
        setChartData(dataArray);
      }
    }
  }, [dataStream, xKey, yKey]);

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
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xKey} 
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}
          />
          <Legend />
          <Bar 
            dataKey={yKey} 
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RealTimeBarChart;
