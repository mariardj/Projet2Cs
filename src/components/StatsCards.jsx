import React from 'react';

// Test data - can be modified directly in this file
const testData = {
  drillingDays: { value: 75, percentage: 90 },
  actualCost: { value: 30000, percentage: 1.3 },
  cumulativeCost: { value: 110000, percentage: 70 },
  projectStatus: { value: 75, daysLeft: 15 }
};

const StatsCards = () => {
  // Shared card styles
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyle = {
    color: '#202224',
    fontSize: '14px',
    margin: '0 0 12px 0'
  };

  const valueStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 12px 0'
  };

  const percentageStyle = (color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: color
  });

  const statusStyle = {
    color: '#202224',
    opacity: 0.7
  };

  // Card components
  const TotalDrillingDaysCard = () => (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Total Drilling Days</h3>
      <div style={valueStyle}>{testData.drillingDays.value} days</div>
      <div style={percentageStyle(
        testData.drillingDays.percentage > 10 ? '#B60000' :
        testData.drillingDays.percentage > 5 ? '#FFA500' : '#00B69B'
      )}>
        {testData.drillingDays.percentage > 0 ? '▲' : '▼'} 
        {Math.abs(testData.drillingDays.percentage)}%&nbsp;
        <span style={statusStyle}>
          {testData.drillingDays.percentage > 0 ? 'over' : 'under'} planned
        </span>
      </div>
    </div>
  );

  const ActualCostCard = () => (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Actual cost for today</h3>
      <div style={valueStyle}>
        ${testData.actualCost.value.toLocaleString()}
      </div>
      <div style={percentageStyle(
        Math.abs(testData.actualCost.percentage) > 2 ? '#B60000' :
        Math.abs(testData.actualCost.percentage) > 1 ? '#FFA500' : '#00B69B'
      )}>
        {testData.actualCost.percentage > 0 ? '▲' : '▼'} 
        {Math.abs(testData.actualCost.percentage)}%&nbsp;
        <span style={statusStyle}>from past week</span>
      </div>
    </div>
  );

  const CumulativeCostCard = () => (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Cumulative cost</h3>
      <div style={valueStyle}>
        ${testData.cumulativeCost.value.toLocaleString()}
      </div>
      <div style={percentageStyle(
        testData.cumulativeCost.percentage > 3 ? '#B60000' :
        testData.cumulativeCost.percentage > 1 ? '#FFA500' : '#00B69B'
      )}>
        {testData.cumulativeCost.percentage > 0 ? '▲' : '▼'} 
        {Math.abs(testData.cumulativeCost.percentage)}%&nbsp;
        <span style={statusStyle}>planned cost</span>
      </div>
    </div>
  );

  const ProjectStatusCard = () => (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Global Project Status</h3>
      <div style={valueStyle}>
        {testData.projectStatus.value}% Completed
      </div>
      <div style={percentageStyle(
        testData.projectStatus.value < 70 ? '#B60000' :
        testData.projectStatus.value < 90 ? '#FFA500' : '#00B69B'
      )}>
        <span style={statusStyle}>
          {testData.projectStatus.daysLeft} Days Left
        </span>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <TotalDrillingDaysCard />
      <ActualCostCard />
      <CumulativeCostCard />
      <ProjectStatusCard />
    </div>
  );
};

export default StatsCards;