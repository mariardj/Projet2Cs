import React from 'react';

const StatsCards = () => {
  // Shared card styles
  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    minWidth: '160px',
    flexShrink: 0
  };

  const titleStyle = {
    color: '#202224',
    fontSize: '12px',
    margin: '0 0 8px 0'
  };

  const valueStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 8px 0'
  };

  const percentageStyle = (color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: color
  });

  return (
    <>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Total Drilling Days</h3>
        <div style={valueStyle}>75 days</div>
        <div style={percentageStyle('#B60000')}>
          ▲7% <span style={{ opacity: 0.7 }}>over planned</span>
        </div>
      </div>
      
      <div style={cardStyle}>
        <h3 style={titleStyle}>Actual cost for today</h3>
        <div style={valueStyle}>$30,000</div>
        <div style={percentageStyle('#B60000')}>
          ▲1.3% <span style={{ opacity: 0.7 }}>from past week</span>
        </div>
      </div>
      
      <div style={cardStyle}>
        <h3 style={titleStyle}>Cumulative cost</h3>
        <div style={valueStyle}>$110,000</div>
        <div style={percentageStyle('#B60000')}>
          ▲1% <span style={{ opacity: 0.7 }}>planned cost</span>
        </div>
      </div>
      
      <div style={cardStyle}>
        <h3 style={titleStyle}>Global Project Status</h3>
        <div style={valueStyle}>75% Completed</div>
        <div style={percentageStyle('#00B69B')}>
          <span style={{ opacity: 0.7 }}>15 Days Left</span>
        </div>
      </div>
    </>
  );
};

export default StatsCards;