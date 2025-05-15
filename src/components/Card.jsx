import React from 'react';

const Card = () => {
  // Card data (could later come from props or API)
  const value = 75;
  const percentage = 50;

  // Determine color based on percentage range
  const getPercentageColor = (percent) => {
    if (Math.abs(percent) > 10) return '#B60000'; // Red for >10%
    if (Math.abs(percent) < 5) return '#00B69B'; // Green for <5%
    return '#FFA500'; // Orange for 5-10%
  };

  // Determine arrow direction and planning status
  const arrowIcon = percentage > 0 ? '▲' : '▼';
  const planningStatus = percentage > 0 ? 'over planning' : 'under planning';

  // Inline styles
  const styles = {
    container: {
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: 'fit-content',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      margin: 0,
      padding: 0
    },
title: {
  color: '#202224', // <-- This is your desired grey color
  fontSize: '14px',
  marginBottom: '8px'
},
    value: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 0 12px 0'
    },
    percentageContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px'
    },
    percentageText: {
      color: getPercentageColor(percentage)
    },
    statusText: {
      color: '#202224',
      opacity: 0.7
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* 🎯 Title is hardcoded directly in JSX */}
        <p style={styles.title}>Total Drilling Days</p>

        {/* Value */}
        <h2 style={styles.value}>{value} days</h2>

        {/* Percentage Info */}
        <div style={styles.percentageContainer}>
          <span style={styles.percentageText}>{arrowIcon}</span>
          <span style={styles.percentageText}>{Math.abs(percentage)}%</span>
          <span style={styles.statusText}>{planningStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;