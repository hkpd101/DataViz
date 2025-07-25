import React from 'react';
import RealTimeBarChart from '../src/components/RealTimeBarChart/RealTimeBarChart';

const testData = {
  data: [
    { category: 'Crude Steel', value: 1950, unit: 'tons', target: 2000 },
    { category: 'Finished Steel', value: 1420, unit: 'tons', target: 1500 },
    { category: 'Hot Rolled', value: 890, unit: 'tons', target: 900 },
    { category: 'Cold Rolled', value: 340, unit: 'tons', target: 350 },
    { category: 'Galvanized', value: 200, unit: 'tons', target: 200 },
    { category: 'Stainless Steel', value: 140, unit: 'tons', target: 140 },
  ]
};

export default function TestChart() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>Steel Production Chart Test</h1>
      <RealTimeBarChart
        title="Steel Production by Type (Test)"
        dataStream={testData}
        xKey="category"
        yKey="value"
        isConnected={true}
        height={400}
      />
      
      <div style={{ marginTop: '20px', background: 'white', padding: '10px', borderRadius: '8px' }}>
        <h3>Test Data:</h3>
        <pre>{JSON.stringify(testData, null, 2)}</pre>
      </div>
    </div>
  );
}
