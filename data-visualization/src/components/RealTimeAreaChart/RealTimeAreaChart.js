import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 20px 0;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
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
    color: #e0e0e0;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const CustomTooltip = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const RealTimeAreaChart = ({ 
  title, 
  dataStream, 
  xKey = 'timestamp', 
  areas = [], 
  height = 300,
  isConnected = false 
}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (dataStream && dataStream.length > 0) {
      // Keep only the last 20 data points for better performance
      const limitedData = dataStream.slice(-20);
      setChartData(limitedData);
    }
  }, [dataStream]);

  const formatXAxisValue = (value) => {
    if (xKey === 'timestamp') {
      return new Date(value).toLocaleTimeString();
    }
    return value;
  };

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
            {xKey === 'timestamp' ? new Date(label).toLocaleString() : label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '4px 0', color: entry.color }}>
              {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}`}
            </p>
          ))}
        </CustomTooltip>
      );
    }
    return null;
  };

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
        <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {areas.map((area, index) => (
              <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey={xKey} 
            tickFormatter={formatXAxisValue}
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
          />
          <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
          <Tooltip content={customTooltip} />
          <Legend wrapperStyle={{ color: 'white' }} />
          {areas.map((area, index) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              stroke={colors[index % colors.length]}
              fill={`url(#gradient${index})`}
              name={area.name}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RealTimeAreaChart;
