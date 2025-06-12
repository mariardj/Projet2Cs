import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function CostStatusGauge({ idForage, small = false }) {
  const [costData, setCostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const size = small
    ? { width: 200, height: 130, ringWidth: 20, fontSize: '14px' }
    : { width: 300, height: 200, ringWidth: 30, fontSize: '18px' };

  useEffect(() => {
    const fetchCostStatus = async () => {
      if (!idForage) {
        console.warn('idForage is missing or invalid:', idForage);
        setError('Check your notifications');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${API_BASE_URL}/myapp/cost-status/${idForage}/`;
        const response = await axios.get(apiUrl);

        if (response.data && typeof response.data === 'object') {
          setCostData(response.data);
        } else {
          setError('Unexpected data format');
        }

      } catch (err) {
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data?.error || err.response.data?.message || 'Server error'}`);
        } else if (err.request) {
          setError('Connection error');
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCostStatus();
  }, [idForage]);

  const getClampedSegments = (costData) => {
    const { segments } = costData;
    const clampedValue = Math.min(segments.current_value, segments.max_value);
    return {
      ...segments,
      current_value: clampedValue
    };
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '0 DZD';
    }
    return new Intl.NumberFormat('en-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'green': return '#00B69B';
      case 'orange': return '#FF8500';
      case 'red': return '#B60000';
      default: return '#666';
    }
  };

  // const getEnglishStatusText = (text) => {
  //   switch (text.toLowerCase()) {
  //     case 'acceptable':
  //     case 'green':
  //       return 'Acceptable';
  //     case 'slightly_over':
  //     case 'orange':
  //     case 'slightly exceeded':
  //       return 'Slightly Over Budget';
  //     case 'critical_over':
  //     case 'red':
  //     case 'critically exceeded':
  //       return 'Critically Over Budget';
  //     default:
  //       return 'Not defined';
  //   }
  // };

  if (loading) {
    return <div style={{ width: size.width + 40, padding: '16px', textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ width: size.width + 40, padding: '16px', textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  if (!costData) {
    return <div style={{ width: size.width + 40, padding: '16px', textAlign: 'center' }}>No data available</div>;
  }

  const { 
    cout_previsionnel_standard = 0,
    cout_cumulatif_actuel = 0, 
    segments = { max_value: 100, current_value: 0, segment_stops: [0, 50, 100] }, 
    statut = 'green', 
    statut_text = 'Not defined', 
    pourcentage_depassement = 0,
    phase_info = { nom_phase_standard: 'Unknown phase', current_operation: 'Unknown operation' }
  } = costData;

  const clampedSegments = getClampedSegments(costData);
  const isValueCapped = segments.current_value > segments.max_value;

  return (
    <div >
      <h3 style={{ fontSize: size.fontSize, marginBottom: '8px', color: '#333' }}>
         Current phase Cost status
      </h3>
       <div
        style={{
          fontSize: '12px',
          marginBottom: '12px',
          color: getStatusColor(statut),
          fontWeight: 'bold',
          padding: '4px 8px',
          backgroundColor: `${getStatusColor(statut)}15`,
          borderRadius: '12px',
          display: 'inline-block'
        }}
      >
        {statut_text}
      </div>
      

      <ReactSpeedometer
        maxValue={clampedSegments.max_value}
        value={clampedSegments.current_value}
        needleColor="black"
        segments={3}
        currentValueText={formatCurrency(cout_cumulatif_actuel)}
        customSegmentStops={clampedSegments.segment_stops}
        segmentColors={["#00B69B", "#FF8500", "#B60000"]}
        ringWidth={size.ringWidth}
        width={size.width}
        height={size.height}
        textColor="#333"
        valueTextFontSize="12px"
        labelFontSize="10px"
      />

      {isValueCapped && (
        <div style={{ marginTop: '4px', fontSize: '10px', color: '#B60000', fontWeight: 'bold', backgroundColor: '#ffebee', padding: '2px 6px', borderRadius: '8px', display: 'inline-block' }}>
          ⚠️ Severe over budget (pointer capped)
        </div>
      )}

      {!small && (
        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '11px', color: '#666', margin: '2px 0' }}>{phase_info.nom_phase_standard}</p>
          <p style={{ fontSize: '11px', color: '#666', margin: '2px 0' }}>{phase_info.current_operation}</p>
          <p style={{ fontSize: '11px', color: getStatusColor(statut), margin: '4px 0', fontWeight: 'bold' }}>
            {pourcentage_depassement >= 0 ? '+' : ''}{pourcentage_depassement}% vs budget
          </p>
          <p style={{ fontSize: '10px', color: '#999', margin: '2px 0' }}>
            Budget: {formatCurrency(cout_previsionnel_standard)}
          </p>
        </div>
      )}
    </div>
  );
}

// import React from "react";
// import ReactSpeedometer from "react-d3-speedometer";

// export default function CostStatusGauge({ small = false }) {
//   const size = small
//     ? { width: 200, height: 130, ringWidth: 20, fontSize: '14px' }
//     : { width: 300, height: 200, ringWidth: 30, fontSize: '18px' };

//   return (
//     <div
//       style={{
//         width: size.width + 40,
//         padding: '16px',
//         background: '#fff',
//         borderRadius: '10px',
//         boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
//         textAlign: 'center',
//         boxSizing: 'border-box',
        
//       }}
//     >
//       <h3 style={{ fontSize: size.fontSize, marginBottom: '12px' }}>
//         Cost status of current phase
//       </h3>

//       <ReactSpeedometer
//         maxValue={30000}
//         value={4900}
//         needleColor="black"
//         segments={3}
//         currentValueText="$4,900"
//         customSegmentStops={[0, 8000, 16000, 30000]}
//         segmentColors={["#00B69B", "#FF8500", "#B60000"]}
//         ringWidth={size.ringWidth}
//         width={size.width}
//         height={size.height}
//       />

//       {!small && <p style={{ fontSize: '13px' }}>12 1/4" × 9 5/8"</p>}
//     </div>
//   );
// }
