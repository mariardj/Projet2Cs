import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function ForageCostStatusGauge({ idForage, small = false }) {
  const [costData, setCostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const size = small
    ? { width: 200, height: 130, ringWidth: 20, fontSize: '14px' }
    : { width: 300, height: 200, ringWidth: 30, fontSize: '18px' };

  useEffect(() => {
    const fetchForageCostStatus = async () => {
      if (!idForage) {
        console.warn('idForage is missing or invalid:', idForage);
        setError('Missing drilling ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${API_BASE_URL}/myapp/api/dashboard/forage-cost/${idForage}/`;

        console.log('API call to:', apiUrl);

        const response = await axios.get(apiUrl);

        console.log('Received drilling cost data:', response.data);

        if (response.data && typeof response.data === 'object') {
          setCostData(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format');
        }

      } catch (err) {
        console.error('Error fetching drilling cost status:', err);

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

    fetchForageCostStatus();
  }, [idForage]);

  const formatAmount = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '0 €';
    }
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'DZD' }).format(amount);
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'green': return '#00B69B';
      case 'orange': return '#FF8500';
      case 'red': return '#B60000';
      default: return '#666';
    }
  };

  if (loading) {
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: size.height + 60,
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{ fontSize: '12px', color: '#666' }}>Loading...</span>
          <span style={{ fontSize: '10px', color: '#999' }}>ID: {idForage}</span>
        </div>
      </div>
    );
  }

  if (error) {
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
          minHeight: size.height + 60,
        }}
      >
        <h3 style={{ fontSize: size.fontSize, marginBottom: '12px', color: '#B60000' }}>
          Error
        </h3>
        <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
          {error}
        </p>
        <p style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>
          Drilling ID: {idForage}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '8px',
            padding: '4px 8px',
            fontSize: '11px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!costData) {
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
          minHeight: size.height + 60,
        }}
      >
        <p style={{ fontSize: '12px', color: '#666' }}>
          No cost data available
        </p>
      </div>
    );
  }

  const {
    cout_previsionnel_forage = 0,
    cout_actuel_forage = 0,
    statut = 'green',
    statut_text = 'Not defined',
    pourcentage_depassement = 0,
    forage_info = { zone: 'Unknown zone', date_debut: null },
    segments = {
      max_value: 0,
      segment_stops: [0, 0, 0, 0],
      current_value: 0
    }
  } = costData;

  const is_capped = cout_actuel_forage > segments.max_value;

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
        Drilling cost status
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
        maxValue={segments.max_value}
        value={Math.min(cout_actuel_forage, segments.max_value)}
        needleColor="black"
        segments={3}
        currentValueText={formatAmount(cout_actuel_forage)}
        customSegmentStops={segments.segment_stops}
        segmentColors={["#00B69B", "#FF8500", "#B60000"]}
        ringWidth={size.ringWidth}
        width={size.width}
        height={size.height}
        textColor="#333"
        valueTextFontSize="12px"
        labelFontSize="10px"
      />

      {is_capped && (
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
          ⚠️ Extreme cost (needle capped)
        </div>
      )}

      {!small && (
        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '11px', color: '#666', margin: '2px 0' }}>
            Zone: {forage_info.zone}
          </p>
          <p style={{ fontSize: '11px', color: '#666', margin: '2px 0' }}>
            Start: {forage_info.date_debut || 'Not defined'}
          </p>
          <p style={{
            fontSize: '11px',
            color: getStatusColor(statut),
            margin: '4px 0',
            fontWeight: 'bold'
          }}>
            {pourcentage_depassement >= 0 ? '+' : ''}{pourcentage_depassement}% vs planned budget
          </p>
          <p style={{ fontSize: '10px', color: '#999', margin: '2px 0' }}>
            Planned budget: {formatAmount(cout_previsionnel_forage)}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
