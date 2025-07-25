import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 12px 40px 0 rgba(31, 38, 135, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
`;

const ChartTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  
  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.status === 'Operational' ? '#82ca9d' : 
                                props.status === 'Maintenance' ? '#ffc658' : '#ff7c7c'};
  }
  
  .status-text {
    color: white;
    font-weight: 500;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  
  .metric-value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 5px;
  }
  
  .metric-label {
    font-size: 0.8rem;
    color: #e0e0e0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const EquipmentPerformanceChart = ({ title, dataStream, isConnected, height = 400 }) => {
  const getBarColor = (efficiency) => {
    if (efficiency >= 95) return '#82ca9d';
    if (efficiency >= 85) return '#8884d8';
    if (efficiency >= 75) return '#ffc658';
    return '#ff7c7c';
  };

  const formatTooltip = (value, name, props) => {
    if (name === 'efficiency') {
      return [`${value.toFixed(1)}%`, 'Efficiency'];
    }
    return [value, name];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>{label}</p>
          <p style={{ color: '#82ca9d', margin: '5px 0' }}>
            Efficiency: {data.efficiency?.toFixed(1)}%
          </p>
          {data.temperature && (
            <p style={{ color: '#ff7c7c', margin: '5px 0' }}>
              Temperature: {data.temperature?.toFixed(0)}°C
            </p>
          )}
          {data.speed && (
            <p style={{ color: '#8884d8', margin: '5px 0' }}>
              Speed: {data.speed?.toFixed(0)} m/min
            </p>
          )}
          <StatusIndicator status={data.status}>
            <div className="status-dot" />
            <span style={{ color: 'white', fontSize: '0.9rem' }}>{data.status}</span>
          </StatusIndicator>
        </div>
      );
    }
    return null;
  };

  // Calculate averages for metrics display
  const avgEfficiency = dataStream?.length > 0 
    ? dataStream.reduce((sum, item) => sum + (item.efficiency || 0), 0) / dataStream.length 
    : 0;
    
  const operationalCount = dataStream?.filter(item => item.status === 'Operational').length || 0;
  const maintenanceCount = dataStream?.filter(item => item.status === 'Maintenance').length || 0;

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      
      <div style={{ height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataStream} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="equipment" 
              stroke="#fff" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#fff" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="efficiency" radius={[4, 4, 0, 0]}>
              {dataStream?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.efficiency)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <MetricsGrid>
        <MetricCard>
          <div className="metric-value">{avgEfficiency.toFixed(1)}%</div>
          <div className="metric-label">Avg Efficiency</div>
        </MetricCard>
        <MetricCard>
          <div className="metric-value">{operationalCount}</div>
          <div className="metric-label">Operational</div>
        </MetricCard>
        <MetricCard>
          <div className="metric-value">{maintenanceCount}</div>
          <div className="metric-label">Maintenance</div>
        </MetricCard>
        <MetricCard>
          <div className="metric-value">{dataStream?.length || 0}</div>
          <div className="metric-label">Total Units</div>
        </MetricCard>
      </MetricsGrid>
    </ChartContainer>
  );
};

export default EquipmentPerformanceChart;
