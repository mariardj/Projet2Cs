import React, { useEffect, useState } from 'react';
import axios from 'axios';
import remark from '../assets/remark.svg'; // Assure-toi que ce fichier existe

const severityColors = {
  HIGH: {
    bg: '#F8D7DA',
    text: '#D32F2F',
    dot: '#D32F2F',
  },
  MEDIUM: {
    bg: '#FFE7CC',
    text: '#FF8500',
    dot: '#FF8500',
  },
  LOW: {
    bg: '#D2F4EF',
    text: '#00B69B',
    dot: '#00B69B',
  },
};

const RemarqueCard = ({ idForage }) => {
  const [remarque, setRemarque] = useState(null);

  useEffect(() => {
    const fetchRemarque = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/myapp/api/forage/${idForage}/remarque/`);
        setRemarque(response.data.remarque);
      } catch (error) {
        console.error('Erreur lors de la récupération de la remarque :', error);
      }
    };

    fetchRemarque();
  }, [idForage]);

  if (!remarque) {
    return <div>Aucune remarque disponible.</div>;
  }

  const { titre, observation, priorite } = remarque;
  const severity = priorite.priority_remarque; // ✅ On accède à la valeur à afficher
  const color = severityColors[severity] || severityColors['FAIBLE'];

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={remark}
          alt="Remarque Icon"
          style={{ width: '20px', height: '20px', objectFit: 'contain' }}
        />
        <div style={{ fontSize: '14px', color: '#333' }}>
          <strong>{titre}:</strong> {observation}
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
