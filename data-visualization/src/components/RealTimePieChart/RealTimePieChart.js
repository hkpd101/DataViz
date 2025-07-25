import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const RealTimePieChart = ({ 
  title, 
  data = [], 
  nameKey = 'name', 
  valueKey = 'value',
  height = 300,
  isConnected = false 
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <CustomTooltip>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
            {data.name}
          </p>
          <p style={{ margin: '4px 0', color: data.payload.fill }}>
            {`Value: ${typeof data.value === 'number' ? data.value.toFixed(2) : data.value}`}
          </p>
          <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#ccc' }}>
            {`Percentage: ${((data.value / data.payload.total) * 100).toFixed(1)}%`}
          </p>
        </CustomTooltip>
      );
    }
    return null;
  };

  // Calculate total for percentage
  const total = data.reduce((sum, entry) => sum + entry[valueKey], 0);
  const dataWithTotal = data.map(entry => ({ ...entry, total }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
        textShadow="1px 1px 2px rgba(0,0,0,0.8)"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey={valueKey}
            nameKey={nameKey}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {dataWithTotal.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                stroke={activeIndex === index ? '#ffffff' : 'none'}
                strokeWidth={activeIndex === index ? 2 : 0}
              />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend 
            wrapperStyle={{ color: 'white', paddingTop: '20px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RealTimePieChart;
