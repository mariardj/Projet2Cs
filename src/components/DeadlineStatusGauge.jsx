import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function DelayStatusGauge({ idForage, small = false }) {
  const [delayData, setDelayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const size = small
    ? { width: 200, height: 130, ringWidth: 20, fontSize: '14px' }
    : { width: 300, height: 200, ringWidth: 30, fontSize: '18px' };

  useEffect(() => {
    const fetchDelayStatus = async () => {
      if (!idForage) {
        setError('Missing drilling ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${API_BASE_URL}/myapp/api/dashboard/phase-delay/${idForage}/`;
        const response = await axios.get(apiUrl);
        console.log('Received delay data from API:', response.data);

        if (response.data && typeof response.data === 'object') {
          setDelayData(response.data);
        } else {
          setError('Unexpected data format');
        }

      } catch (err) {
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data?.error || 'Server error'}`);
        } else {
          setError('Connection error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDelayStatus();
  }, [idForage]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'green': return '#00B69B';
      case 'orange': return '#FF8500';
      case 'red': return '#B60000';
      default: return '#666';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!delayData) {
    return <div>No data available</div>;
  }

  const {
    delai_previsionnel = 0,
    delai_actuel = 0,
    pourcentage_depassement = 0,
    statut = 'green',
    statut_text = 'Not defined',
    phase_info = { nom_phase_standard: 'Unknown phase', current_operation: 'Unknown operation' }
  } = delayData;

  const criticalThreshold = delai_previsionnel * 1.2;
  const maxGaugeValue = criticalThreshold;
  const currentGaugeValue = Math.min(delai_actuel, criticalThreshold);
  const segmentStops = [0, delai_previsionnel, criticalThreshold];

  const isValueCapped = delai_actuel > criticalThreshold;

  return (
    <div
      style={{
        width: size.width + 40,
        padding: '16px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      <h3 style={{ fontSize: size.fontSize, marginBottom: '8px', color: '#333' }}>
        Current phase delay status
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
          display: 'inline-block',
        }}
      >
        {statut_text}
      </div>

      <ReactSpeedometer
        maxValue={maxGaugeValue}
        value={currentGaugeValue}
        needleColor="black"
        segments={3}
        currentValueText={`${delai_actuel} days`}
        customSegmentStops={segmentStops}
        segmentColors={["#00B69B", "#FF8500", "#B60000"]}
        ringWidth={size.ringWidth}
        width={size.width}
        height={size.height}
        textColor="#333"
        valueTextFontSize="12px"
        labelFontSize="10px"
      />

      {isValueCapped && (
        <div style={{
          marginTop: '4px',
          fontSize: '10px',
          color: '#B60000',
          fontWeight: 'bold',
          backgroundColor: '#ffebee',
          padding: '2px 6px',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          ⚠️ Extreme overrun (needle capped)
        </div>
      )}

      {!small && (
        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '11px', color: '#666', margin: '2px 0' }}>
            {phase_info.nom_phase_standard}
          </p>
          <p style={{ fontSize: '11px', color: '#666', margin: '2px 0' }}>
            {phase_info.current_operation}
          </p>
          <p style={{
            fontSize: '11px',
            color: getStatusColor(statut),
            margin: '4px 0',
            fontWeight: 'bold'
          }}>
            {pourcentage_depassement >= 0 ? '+' : ''}{pourcentage_depassement}% vs plan
          </p>
          <p style={{ fontSize: '10px', color: '#999', margin: '2px 0' }}>
            Planned: {delai_previsionnel} days
          </p>
        </div>
      )}
    </div>
  );
}


// import React from "react";
// import ReactSpeedometer from "react-d3-speedometer";

// export default function DeadlineStatusGauge({ small = false }) {
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
//         Deadline status of current phase
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
