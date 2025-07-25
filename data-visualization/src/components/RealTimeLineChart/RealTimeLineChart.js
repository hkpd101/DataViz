import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
  }
  
  .status-text {
    font-size: 0.9rem;
    color: #666;
  }
`;

const RealTimeLineChart = ({ 
  title, 
  dataStream, 
  xKey = 'timestamp', 
  lines = [], 
  height = 300,
  isConnected = false 
}) => {
  const [chartData, setChartData] = useState([]);
  const maxDataPoints = 50;

  useEffect(() => {
    if (dataStream) {
      setChartData(prevData => {
        const newData = [...prevData];
        
        // Add new data point
        const newPoint = {
          [xKey]: new Date(dataStream.timestamp).toLocaleTimeString(),
          ...dataStream.data
        };
        
        newData.push(newPoint);
        
        // Keep only the last N data points
        if (newData.length > maxDataPoints) {
          newData.shift();
        }
        
        return newData;
      });
    }
  }, [dataStream, xKey]);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

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
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xKey} 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
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
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
              name={line.name || line.dataKey}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RealTimeLineChart;
