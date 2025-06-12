// StatsCards.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsCards = ({ idForage }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/myapp/dashboard/${idForage}/`);
        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
          setLoading(false);
          console.error("Erreur lors du chargement des données:", err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [idForage]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données</p>;
  if (!data) return null;

  const cardsData = [
    {
      title: 'Total Drilling Days',
      value: `${data.nombre_de_jours} days`,
      // change: '▲7%',
      // note: 'over planned',
      color: '#B60000'
    },
    {
      title: 'Actual cost for today',
      value: `$ ${data.cout_actuel.toLocaleString()}`,
      // change: '▲1.3%',
      // note: 'from past week',
      color: '#B60000'
    },
    {
      title: 'Cumulative cost',
      value: `$${data.cout_cumulatif.toLocaleString()}`,
      // change: '▲1%',
      // note: 'planned cost',
      color: '#B60000'
    },
    {
      title: 'Current Phase',
      value: data.phase_actuelle,
      change: '',
      note: '',
      color: '#00B69B'
    }
  ];

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
            minWidth: 0,
            width: '200px'
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
    </div>
  );
};

export default StatsCards;

// import React from 'react';
// import axios from 'axios';
// import { useEffect, useState } from 'react';


//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/dashboard/${idForage}/`)
//       .then(response => setData(response.data))
//       .catch(error => console.error(error));
//   }, [idForage]);

//   if (!data) return <p>Chargement...</p>;

// const StatsCards = () => {
//   const cardsData = [
//     { 
//       title: 'Total Drilling Days',
//       value: data.total_drilling_days,
//       change: '▲7%',
//       note: 'over planned',
//       color: '#B60000'
//     },
//     {
//       title: 'Actual cost for today',
//       value: '$30,000',
//       change: '▲1.3%',
//       note: 'from past week',
//       color: '#B60000'
//     },
//     {
//       title: 'Cumulative cost',
//       value: '$110,000',
//       change: '▲1%',
//       note: 'planned cost',
//       color: '#B60000'
//     },
//     {
//       title: 'Global Project Status',
//       value: '75% Completed',
//       change: '',
//       note: '15 Days Left',
//       color: '#00B69B'
//     }
//   ];

//   return (
//     <>
//       {cardsData.map((card, index) => (
//         <div
//           key={index}
//           style={{
//             backgroundColor: 'white',
//             border: '1px solid #e0e0e0',
//             borderRadius: '6px',
//             padding: '12px',
//             boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//             flex: 1,
//             minWidth: 0 // ensures flex works nicely
//           }}
//         >
//           <h3 style={{ color: '#202224', fontSize: '12px', margin: '0 0 8px 0' }}>
//             {card.title}
//           </h3>
//           <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
//             {card.value}
//           </div>
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '4px',
//               fontSize: '12px',
//               color: card.color
//             }}
//           >
//             {card.change && <span>{card.change}</span>}
//             <span style={{ opacity: 0.7 }}>{card.note}</span>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default StatsCards;
