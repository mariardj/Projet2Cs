import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import axios from "axios";

// Configuration de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function ForageDelayStatusGauge({ idForage, small = false }) {
  const [delayData, setDelayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const size = small
    ? { width: 200, height: 130, ringWidth: 20, fontSize: '14px' }
    : { width: 300, height: 200, ringWidth: 30, fontSize: '18px' };

  useEffect(() => {
    const fetchForageDelayStatus = async () => {
      if (!idForage) {
        console.warn('idForage est manquant ou invalide:', idForage);
        setError('ID forage manquant');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = `${API_BASE_URL}/myapp/api/dashboard/forage-delay/${idForage}/`;
        
        console.log('Appel API vers:', apiUrl);
        
        const response = await axios.get(apiUrl);
        
        console.log('Données délai forage reçues:', response.data);
        
        if (response.data && typeof response.data === 'object') {
          setDelayData(response.data);
        } else {
          console.error('Format de données inattendu:', response.data);
          setError('Format de données inattendu');
        }
        
      } catch (err) {
        console.error('Erreur lors de la récupération du statut délai forage:', err);
        
        if (err.response) {
          setError(`Erreur ${err.response.status}: ${err.response.data?.error || err.response.data?.message || 'Erreur serveur'}`);
        } else if (err.request) {
          setError('Erreur de connexion au serveur');
        } else {
          setError(`Erreur: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchForageDelayStatus();
  }, [idForage]);

  // Fonction pour créer les segments basés sur la durée du forage
  const createForageDelaySegments = (delayData) => {
    const { duree_previsionnelle, duree_actuelle } = delayData;
    
    // Créer une échelle similaire aux autres gauges
    const segment_vert = duree_previsionnelle * 1.1; // +10%
    const segment_orange = duree_previsionnelle * 1.25; // +25%
    const max_value = duree_previsionnelle * 1.5; // +50%
    
    // Plafonner current_value pour éviter le débordement
    const current_value = Math.min(duree_actuelle, max_value);
    
    console.log('=== DEBUG FORAGE DELAY SEGMENTS ===');
    console.log('Durée prévue:', duree_previsionnelle);
    console.log('Durée actuelle:', duree_actuelle);
    console.log('Max value:', max_value);
    console.log('Current value (clamped):', current_value);
    console.log('===================================');
    
    return {
      max_value: max_value,
      current_value: current_value,
      segment_stops: [0, segment_vert, segment_orange, max_value],
      is_capped: duree_actuelle > max_value
    };
  };

  // Fonction pour formater la durée en jours
  const formatDuration = (days) => {
    if (days === null || days === undefined || isNaN(days)) {
      return '0 jour';
    }
    return `${Math.round(days)} day${days > 1 ? 's' : ''}`;
  };

  // Fonction pour déterminer la couleur du texte du statut
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
          <span style={{ fontSize: '12px', color: '#666' }}>Chargement...</span>
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
          Erreur
        </h3>
        <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
          {error}
        </p>
        <p style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>
          ID Forage: {idForage}
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
          Réessayer
        </button>
      </div>
    );
  }

  if (!delayData) {
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
          Aucune donnée de durée disponible
        </p>
      </div>
    );
  }

  // Extraction des données avec valeurs par défaut
  const { 
    duree_previsionnelle = 0,
    duree_actuelle = 0, 
    statut = 'green', 
    statut_text = 'Non défini', 
    pourcentage_depassement = 0,
    forage_info = { zone: 'Zone inconnue', date_debut: null }
  } = delayData;

  // Créer les segments avec curseur plafonné
  const segments = createForageDelaySegments(delayData);

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
The deadline status of the drilling      </h3>
      
      {/* Indicateur de statut */}
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
        value={segments.current_value}
        needleColor="black"
        segments={3}
        currentValueText={formatDuration(duree_actuelle)}
        customSegmentStops={segments.segment_stops}
        segmentColors={["#00B69B", "#FF8500", "#B60000"]}
        ringWidth={size.ringWidth}
        width={size.width}
        height={size.height}
        textColor="#333"
        valueTextFontSize="12px"
        labelFontSize="10px"
      />

      {/* Indicateur de dépassement si la valeur est plafonnée */}
      {segments.is_capped && (
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
          ⚠️ Retard extrême (curseur plafonné)
        </div>
      )}

      {/* Informations supplémentaires */}
      {!small && (
        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '11px', color: '#666', margin: '2px 0' }}>
            Zone: {forage_info.zone}
          </p>
          <p style={{ fontSize: '11px', color: '#666', margin: '2px 0' }}>
            Start: {forage_info.date_debut || 'Non défini'}
          </p>
          <p style={{ 
            fontSize: '11px', 
            color: getStatusColor(statut), 
            margin: '4px 0',
            fontWeight: 'bold'
          }}>
            {pourcentage_depassement >= 0 ? '+' : ''}{pourcentage_depassement}% vs planned
          </p>
          <p style={{ fontSize: '10px', color: '#999', margin: '2px 0' }}>
            Planned: {formatDuration(duree_previsionnelle)}
          </p>
        </div>
      )}

      {/* Animation CSS pour le loader */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}