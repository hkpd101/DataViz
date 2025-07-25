import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

const ControlsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const ControlsHeader = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.3rem;
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
  min-width: 100px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &.primary {
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  }
  
  &.secondary {
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
    }
  }
  
  &.success {
    background-color: #28a745;
    color: white;
    
    &:hover {
      background-color: #1e7e34;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatusDisplay = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  
  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .label {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }
    
    .value {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }
`;

const DataControls = ({ onDataTypeChange, onExportData, connectionStatus, dataStats }) => {
  const [selectedDataType, setSelectedDataType] = useState('steel_production');
  const [isExporting, setIsExporting] = useState(false);

  const dataTypes = [
    { value: 'steel_production', label: 'Steel Production Volume' },
    { value: 'production_efficiency', label: 'Production Efficiency' },
    { value: 'quality_metrics', label: 'Quality Metrics' },
  ];

  const handleDataTypeChange = (e) => {
    const newDataType = e.target.value;
    setSelectedDataType(newDataType);
    onDataTypeChange(newDataType);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await apiService.exportDataCSV(selectedDataType, { limit: 1000 });
      apiService.downloadCSV(blob, `${selectedDataType}_data.csv`);
      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefreshData = () => {
    onDataTypeChange(selectedDataType);
    toast.info('Data refreshed');
  };

  return (
    <ControlsContainer>
      <ControlsHeader>Dashboard Controls</ControlsHeader>
      
      <ControlGroup>
        <Label>Data Type:</Label>
        <Select value={selectedDataType} onChange={handleDataTypeChange}>
          {dataTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </ControlGroup>
      
      <ControlGroup>
        <Button 
          className="primary" 
          onClick={handleRefreshData}
        >
          Refresh Data
        </Button>
        
        <Button 
          className="success" 
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? 'Exporting...' : 'Export CSV'}
        </Button>
      </ControlGroup>

      <StatusDisplay>
        <div className="status-item">
          <div className="label">Connection</div>
          <div className="value" style={{ 
            color: connectionStatus === 'Connected' ? '#28a745' : '#dc3545' 
          }}>
            {connectionStatus}
          </div>
        </div>
        
        {dataStats && (
          <>
            <div className="status-item">
              <div className="label">Data Points</div>
              <div className="value">{dataStats.count || 0}</div>
            </div>
            
            <div className="status-item">
              <div className="label">Last Update</div>
              <div className="value">
                {dataStats.lastUpdate ? 
                  new Date(dataStats.lastUpdate).toLocaleTimeString() : 
                  'N/A'
                }
              </div>
            </div>
          </>
        )}
      </StatusDisplay>
    </ControlsContainer>
  );
};

export default DataControls;
