import React from 'react';
import remark from '../assets/remark.svg'; // Replace with your actual SVG file

const severityColors = {
  High: {
    bg: '#F8D7DA',
    text: '#D32F2F',
    dot: '#D32F2F',
  },
  Medium: {
    bg: '#FFE7CC',
    text: '#FF8500',
    dot: '#FF8500',
  },
  Low: {
    bg: '#D2F4EF',
    text: '#00B69B',
    dot: '#00B69B',
  },
};

const RemarqueCard = ({ title, body, severity }) => {
  const color = severityColors[severity] || severityColors['Low'];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #FFA500',
      borderLeft: '5px solid #FFA500',
      borderRadius: '6px',
      padding: '10px 16px',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif',
      justifyContent: 'space-between',
      maxWidth: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', }}>
        <img
          src={remark}
          alt="Remarque Icon"
          style={{
            width: '20px',
            height: '20px',
            objectFit: 'contain'
          }}
        />
        <div style={{ fontSize: '14px', color: '#333' }}>
          <strong>{title}:</strong> {body}
        </div>
      </div>

      <div style={{
        backgroundColor: color.bg,
        color: color.text,
        padding: '4px 10px',
        borderRadius: '16px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
      }}>
        <span style={{
          height: '8px',
          width: '8px',
          backgroundColor: color.dot,
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: '6px'
        }}></span>
        {severity}
      </div>
    </div>
  );
};

export default RemarqueCard;
