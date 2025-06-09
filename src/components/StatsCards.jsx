import React from 'react';

const StatsCards = () => {
  const cardsData = [
    {
      title: 'Total Drilling Days',
      value: '75 days',
      change: '▲7%',
      note: 'over planned',
      color: '#B60000'
    },
    {
      title: 'Actual cost for today',
      value: '$30,000',
      change: '▲1.3%',
      note: 'from past week',
      color: '#B60000'
    },
    {
      title: 'Cumulative cost',
      value: '$110,000',
      change: '▲1%',
      note: 'planned cost',
      color: '#B60000'
    },
    {
      title: 'Global Project Status',
      value: '75% Completed',
      change: '',
      note: '15 Days Left',
      color: '#00B69B'
    }
  ];

  return (
    <>
      {cardsData.map((card, index) => (
        <div
          key={index}
          style={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            padding: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            flex: 1,
            minWidth: 0 // ensures flex works nicely
          }}
        >
          <h3 style={{ color: '#202224', fontSize: '12px', margin: '0 0 8px 0' }}>
            {card.title}
          </h3>
          <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            {card.value}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: card.color
            }}
          >
            {card.change && <span>{card.change}</span>}
            <span style={{ opacity: 0.7 }}>{card.note}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default StatsCards;
