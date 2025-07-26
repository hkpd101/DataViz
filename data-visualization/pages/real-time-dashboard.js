import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Layout from '../src/components/Layout/Layout';
import DataControls from '../src/components/DataControls/DataControls';
import RealTimeLineChart from '../src/components/RealTimeLineChart/RealTimeLineChart';
import RealTimeBarChart from '../src/components/RealTimeBarChart/RealTimeBarChart';
import RealTimeAreaChart from '../src/components/RealTimeAreaChart/RealTimeAreaChart';
import RealTimePieChart from '../src/components/RealTimePieChart/RealTimePieChart';
import EquipmentPerformanceChart from '../src/components/EquipmentPerformanceChart/EquipmentPerformanceChart';
import ProductionComparisonChart from '../src/components/ProductionComparisonChart/ProductionComparisonChart';

// Hooks and Services
import { useRealTimeData } from '../src/hooks/useRealTimeData-vercel';
import apiService from '../src/services/api';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #f0f0f0;
  font-size: 1.2rem;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FullWidthChart = styled.div`
  grid-column: 1 / -1;
`;

const RealTimeDashboard = () => {
  const router = useRouter();
  const { view } = router.query;
  
  // Set initial data type based on view parameter
  const getDataTypeFromView = (viewParam) => {
    switch (viewParam) {
      case 'efficiency': return 'production_efficiency';
      case 'quality': return 'quality_metrics';
      case 'environmental': return 'production_efficiency'; // Use efficiency data for environmental view
      case 'equipment': return 'production_efficiency'; // Use efficiency data for equipment view
      case 'trends': return 'steel_production';
      case 'costs': return 'production_efficiency';
      case 'summary': return 'steel_production'; // Add summary view mapping
      default: return 'steel_production';
    }
  };
  
  const [selectedDataType, setSelectedDataType] = useState(() => getDataTypeFromView(view));
  const [dataStats, setDataStats] = useState(null);
  
  // Update selectedDataType when view parameter changes
  useEffect(() => {
    setSelectedDataType(getDataTypeFromView(view));
  }, [view]);
  
  // Generate a unique client ID for this session
  const [clientId] = useState(() => `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  // Use the real-time data hook
  const { data: realTimeData, connectionStatus, isConnected } = useRealTimeData(clientId);

  useEffect(() => {
    // Load initial data statistics
    const loadDataStats = async () => {
      try {
        const summary = await apiService.getDataSummary(selectedDataType);
        setDataStats({
          count: summary.summary?.total_records || 0,
          lastUpdate: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error loading data stats:', error);
      }
    };

    loadDataStats();
  }, [selectedDataType]);

  const handleDataTypeChange = (newDataType) => {
    setSelectedDataType(newDataType);
  };

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  // Helper function to get chart data based on data type
  const getChartData = (dataType) => {
    console.log('getChartData called with:', dataType);
    console.log('realTimeData:', realTimeData);
    
    // Enhanced fallback mock data for testing
    const mockData = {
      steel_production: {
        data: [
          { category: "Crude Steel", value: 1950, unit: "tons", target: 2000 },
          { category: "Finished Steel", value: 1420, unit: "tons", target: 1500 },
          { category: "Hot Rolled", value: 890, unit: "tons", target: 900 },
          { category: "Cold Rolled", value: 340, unit: "tons", target: 350 },
          { category: "Galvanized", value: 200, unit: "tons", target: 200 },
          { category: "Stainless Steel", value: 140, unit: "tons", target: 140 },
          { category: "Alloy Steel", value: 110, unit: "tons", target: 110 },
          { category: "Tool Steel", value: 60, unit: "tons", target: 60 }
        ],
        total_production: 5110,
        efficiency_rating: "High"
      },
      production_efficiency: {
        data: {
          furnace_efficiency: 92.5,
          energy_consumption: 485,
          yield_rate: 91.2,
          downtime_hours: 1.8,
          maintenance_score: 88.5,
          operator_efficiency: 94.2,
          raw_material_utilization: 91.8,
          production_speed: 105.2,
          quality_compliance: 97.8,
          safety_incidents: 0,
          cost_per_ton: 525
        }
      },
      quality_metrics: {
        data: {
          defect_rate: 0.8,
          tensile_strength: 485,
          carbon_content: 0.42,
          surface_quality: 98.5,
          hardness_hrc: 45.2,
          elongation_percent: 28.5,
          impact_resistance: 120,
          corrosion_resistance: 8.7,
          dimensional_accuracy: 98.9,
          coating_thickness: 55,
          customer_satisfaction: 94.2
        }
      },
      environmental_metrics: {
        data: {
          co2_emissions: 2.1,
          water_usage: 4.8,
          energy_intensity: 21.5,
          waste_recycled: 92.3,
          air_quality_index: 68,
          noise_level: 72,
          dust_emissions: 0.4,
          water_temperature: 22.5
        }
      },
      equipment_performance: {
        data: [
          { equipment: "Blast Furnace #1", efficiency: 94.2, temperature: 1520, status: "Operational" },
          { equipment: "Blast Furnace #2", efficiency: 91.8, temperature: 1505, status: "Operational" },
          { equipment: "Rolling Mill A", efficiency: 96.5, speed: 205, status: "Operational" },
          { equipment: "Rolling Mill B", efficiency: 92.1, speed: 195, status: "Operational" },
          { equipment: "Galvanizing Line", efficiency: 95.8, coating_rate: 98, status: "Operational" },
          { equipment: "Quality Scanner", efficiency: 98.9, scan_rate: 99.2, status: "Operational" }
        ]
      }
    };
    
    const dataSource = realTimeData || mockData;
    
    if (!dataSource) {
      console.log('❌ No data available');
      return [];
    }
    
    // Log the structure we're working with
    console.log('Available data keys:', Object.keys(dataSource));
    
    // Transform the real-time data for charts
    const timestamp = dataSource.timestamp || new Date().toISOString();
    
    switch (dataType) {
      case 'steel_production':
        const steelData = dataSource.steel_production?.data || [];
        console.log('✅ Steel production data found:', steelData);
        return steelData;
      case 'production_efficiency':
        const efficiencyData = dataSource.production_efficiency?.data;
        console.log('✅ Production efficiency data found:', efficiencyData);
        return efficiencyData ? { 
          timestamp, 
          data: efficiencyData 
        } : { timestamp, data: {} };
      case 'quality_metrics':
        const qualityData = dataSource.quality_metrics?.data;
        console.log('✅ Quality metrics data found:', qualityData);
        return qualityData ? { 
          timestamp, 
          data: qualityData 
        } : { timestamp, data: {} };
      case 'environmental_metrics':
        const environmentalData = dataSource.environmental_metrics?.data;
        console.log('✅ Environmental metrics data found:', environmentalData);
        return environmentalData ? { 
          timestamp, 
          data: environmentalData 
        } : { timestamp, data: {} };
      case 'equipment_performance':
        const equipmentData = dataSource.equipment_performance?.data || [];
        console.log('✅ Equipment performance data found:', equipmentData);
        return equipmentData;
      default:
        return [];
    }
  };

  // Enhanced chart configurations
  const steelProductionLines = [
    { dataKey: 'value', name: 'Production Volume (tons)', color: '#8884d8' }
  ];

  const efficiencyLines = [
    { dataKey: 'furnace_efficiency', name: 'Furnace Efficiency (%)', color: '#8884d8' },
    { dataKey: 'energy_consumption', name: 'Energy Consumption (kWh/t)', color: '#82ca9d' },
    { dataKey: 'yield_rate', name: 'Yield Rate (%)', color: '#ffc658' },
    { dataKey: 'operator_efficiency', name: 'Operator Efficiency (%)', color: '#ff7c7c' },
    { dataKey: 'maintenance_score', name: 'Maintenance Score', color: '#8dd1e1' },
    { dataKey: 'production_speed', name: 'Production Speed (%)', color: '#d084d0' }
  ];

  const qualityLines = [
    { dataKey: 'defect_rate', name: 'Defect Rate (%)', color: '#ff7c7c' },
    { dataKey: 'tensile_strength', name: 'Tensile Strength (MPa)', color: '#8884d8' },
    { dataKey: 'surface_quality', name: 'Surface Quality (%)', color: '#ffc658' },
    { dataKey: 'customer_satisfaction', name: 'Customer Satisfaction (%)', color: '#82ca9d' },
    { dataKey: 'dimensional_accuracy', name: 'Dimensional Accuracy (%)', color: '#8dd1e1' }
  ];

  const environmentalLines = [
    { dataKey: 'co2_emissions', name: 'CO2 Emissions (t/t steel)', color: '#ff7c7c' },
    { dataKey: 'water_usage', name: 'Water Usage (m³/t)', color: '#8884d8' },
    { dataKey: 'energy_intensity', name: 'Energy Intensity (GJ/t)', color: '#ffc658' },
    { dataKey: 'waste_recycled', name: 'Waste Recycled (%)', color: '#82ca9d' },
    { dataKey: 'air_quality_index', name: 'Air Quality Index', color: '#8dd1e1' }
  ];

  const equipmentLines = [
    { dataKey: 'efficiency', name: 'Equipment Efficiency (%)', color: '#8884d8' },
    { dataKey: 'temperature', name: 'Temperature (°C)', color: '#ff7c7c' },
    { dataKey: 'speed', name: 'Speed (m/min)', color: '#82ca9d' }
  ];

  // Helper functions for different chart types
  const getBarChartData = (dataType) => {
    const data = getChartData(dataType);
    if (Array.isArray(data)) return data;
    if (data.data && typeof data.data === 'object') {
      return { data: data.data };
    }
    return { data: {} };
  };

  const getLineChartData = (dataType) => {
    const data = getChartData(dataType);
    return data; // Line chart expects { timestamp, data } format
  };

  const getAreaChartData = (dataType) => {
    const data = getChartData(dataType);
    
    // For area charts, we need multiple data points to show trends
    // Generate a series of data points with slight variations
    if (data && data.data && typeof data.data === 'object') {
      const baseTime = new Date();
      const points = [];
      
      // Generate 10 data points over the last 10 minutes
      for (let i = 9; i >= 0; i--) {
        const pointTime = new Date(baseTime.getTime() - (i * 60000)); // 1 minute intervals
        const point = {
          timestamp: pointTime.toLocaleTimeString(),
          time: pointTime.toLocaleTimeString()
        };
        
        // Add each metric with slight random variation
        Object.keys(data.data).forEach(key => {
          const baseValue = data.data[key];
          const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
          point[key] = Number((baseValue * (1 + variation)).toFixed(2));
        });
        
        points.push(point);
      }
      
      return points;
    }
    
    return Array.isArray(data) ? data : [data];
  };

  // Enhanced dashboard titles based on current view
  const getDashboardTitle = () => {
    switch (view) {
      case 'efficiency': return 'Production Efficiency Analytics';
      case 'quality': return 'Quality Control & Assurance';
      case 'environmental': return 'Environmental Impact Monitor';
      case 'equipment': return 'Equipment Performance Center';
      case 'trends': return 'Production Trends & Forecasting';
      case 'costs': return 'Cost Analysis & ROI Dashboard';
      default: return 'Steel Production Control Center';
    }
  };

  const getDashboardSubtitle = () => {
    switch (view) {
      case 'efficiency': return 'Monitor production efficiency, energy consumption, maintenance scores, and operational KPIs in real-time';
      case 'quality': return 'Track quality indicators, defect rates, material composition, and customer satisfaction metrics';
      case 'environmental': return 'Monitor environmental impact, emissions, waste management, and sustainability metrics';
      case 'equipment': return 'Real-time equipment performance, temperature monitoring, and predictive maintenance alerts';
      case 'trends': return 'Analyze historical production trends, forecast demand, and optimize production planning';
      case 'costs': return 'Track production costs, ROI metrics, energy costs, and financial performance indicators';
      default: return 'Comprehensive steel production monitoring with advanced analytics, real-time data streaming, and predictive insights';
    }
  };

  return (
    <Layout>
      <Head>
        <title>{getDashboardTitle()}</title>
        <meta name="description" content="Real-time steel production monitoring dashboard with live data streaming" />
      </Head>

      <DashboardContainer>
        <ContentWrapper>
          <DashboardHeader>
            <Title>{getDashboardTitle()}</Title>
            <Subtitle>
              {getDashboardSubtitle()}
            </Subtitle>
          </DashboardHeader>

          <DataControls
            onDataTypeChange={handleDataTypeChange}
            onExportData={handleExportData}
            connectionStatus={connectionStatus}
            dataStats={dataStats}
          />

          <ChartsGrid>
            {(selectedDataType === 'steel_production' || !selectedDataType) && (
              <>
                <RealTimeBarChart
                  title="Steel Production by Type"
                  dataStream={getChartData('steel_production')}
                  xKey="category"
                  yKey="value"
                  isConnected={isConnected}
                  height={350}
                />
                
                <RealTimeAreaChart
                  title="Production Volume Trends"
                  dataStream={getAreaChartData('steel_production')}
                  xKey="category"
                  areas={[{ dataKey: 'value', name: 'Production Volume (tons)', color: '#8884d8' }]}
                  isConnected={isConnected}
                  height={350}
                />
                
                <RealTimePieChart
                  title="Production Mix Distribution"
                  data={getChartData('steel_production').slice(0, 6).map((item, index) => ({
                    name: item.category,
                    value: item.value,
                    color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'][index]
                  }))}
                  isConnected={isConnected}
                  height={350}
                />
                
                <FullWidthChart>
                  <ProductionComparisonChart
                    title="Steel Production vs Targets Performance Overview"
                    data={getChartData('steel_production')}
                    isConnected={isConnected}
                    height={400}
                  />
                </FullWidthChart>
              </>
            )}

            {(selectedDataType === 'production_efficiency' && (view === 'efficiency' || view === 'environmental' || view === 'equipment' || view === 'costs')) && (
              <>
                <RealTimeBarChart
                  title="Production Efficiency Metrics"
                  dataStream={getBarChartData('production_efficiency')}
                  isConnected={isConnected}
                  height={350}
                />
                
                <RealTimeAreaChart
                  title="Efficiency Trends"
                  dataStream={getAreaChartData('production_efficiency')}
                  xKey="time"
                  areas={efficiencyLines}
                  isConnected={isConnected}
                  height={350}
                />
                
                <FullWidthChart>
                  <RealTimeLineChart
                    title="Efficiency Metrics Over Time"
                    dataStream={getLineChartData('production_efficiency')}
                    lines={efficiencyLines}
                    isConnected={isConnected}
                    height={400}
                  />
                </FullWidthChart>
              </>
            )}

            {(selectedDataType === 'quality_metrics' && view === 'quality') && (
              <>
                <RealTimeBarChart
                  title="Quality Control Metrics"
                  dataStream={getBarChartData('quality_metrics')}
                  isConnected={isConnected}
                  height={350}
                />
                
                <RealTimePieChart
                  title="Quality Distribution"
                  data={[
                    { name: 'Excellent (>95%)', value: 65, color: '#82ca9d' },
                    { name: 'Good (85-95%)', value: 28, color: '#8884d8' },
                    { name: 'Fair (75-85%)', value: 5, color: '#ffc658' },
                    { name: 'Poor (<75%)', value: 2, color: '#ff7c7c' }
                  ]}
                  isConnected={isConnected}
                  height={350}
                />
                
                <FullWidthChart>
                  <RealTimeLineChart
                    title="Quality Metrics Trends Over Time"
                    dataStream={getLineChartData('quality_metrics')}
                    lines={qualityLines}
                    isConnected={isConnected}
                    height={400}
                  />
                </FullWidthChart>
              </>
            )}

            {selectedDataType === 'environmental_metrics' && (
              <>
                <RealTimeBarChart
                  title="Environmental Impact Metrics"
                  dataStream={getBarChartData('production_efficiency')}
                  isConnected={isConnected}
                  height={350}
                />
                
                <RealTimeAreaChart
                  title="Emissions & Resource Usage"
                  dataStream={getAreaChartData('production_efficiency')}
                  xKey="time"
                  areas={efficiencyLines.slice(0, 3)}
                  isConnected={isConnected}
                  height={350}
                />
                
                <FullWidthChart>
                  <RealTimeLineChart
                    title="Environmental Performance Over Time"
                    dataStream={getLineChartData('production_efficiency')}
                    lines={efficiencyLines}
                    isConnected={isConnected}
                    height={400}
                  />
                </FullWidthChart>
              </>
            )}

            {selectedDataType === 'equipment_performance' && (
              <>
                <FullWidthChart>
                  <EquipmentPerformanceChart
                    title="Equipment Efficiency & Status Monitor"
                    dataStream={getChartData('production_efficiency')}
                    isConnected={isConnected}
                    height={400}
                  />
                </FullWidthChart>
                
                <RealTimePieChart
                  title="Equipment Status Distribution"
                  data={[
                    { name: 'Operational', value: 85, color: '#82ca9d' },
                    { name: 'Maintenance', value: 10, color: '#ffc658' },
                    { name: 'Offline', value: 3, color: '#ff7c7c' },
                    { name: 'Standby', value: 2, color: '#8884d8' }
                  ]}
                  isConnected={isConnected}
                  height={350}
                />
                
                <RealTimeAreaChart
                  title="Equipment Performance Trends"
                  dataStream={getAreaChartData('production_efficiency')}
                  xKey="time"
                  areas={[
                    { dataKey: 'furnace_efficiency', name: 'Furnace Efficiency (%)', color: '#8884d8' },
                    { dataKey: 'energy_consumption', name: 'Energy Consumption (kWh/t)', color: '#ff7c7c' }
                  ]}
                  isConnected={isConnected}
                  height={350}
                />
              </>
            )}

            {(view === 'summary' || !view) && selectedDataType === 'steel_production' && (
              <>
                <RealTimeBarChart
                  title="Executive Summary - Key Performance Indicators"
                  dataStream={getChartData('steel_production')}
                  isConnected={isConnected}
                  height={350}
                />
                
                <RealTimeAreaChart
                  title="Production Volume Trends"
                  dataStream={getChartData('steel_production')}
                  areas={[{ dataKey: 'value', name: 'Production Volume (tons)', color: '#8884d8' }]}
                  isConnected={isConnected}
                  height={350}
                />
                
                <FullWidthChart>
                  <ProductionComparisonChart
                    title="Steel Production vs Targets Performance Overview"
                    data={getChartData('steel_production')}
                    isConnected={isConnected}
                    height={400}
                  />
                </FullWidthChart>
              </>
            )}
          </ChartsGrid>
        </ContentWrapper>
      </DashboardContainer>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
};

export default RealTimeDashboard;
