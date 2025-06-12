import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area } from 'recharts';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function ReservoirProgressChart({ idForage }) {
  const [chartData, setChartData] = useState([]);
  const [forageInfo, setForageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idForage) {
      console.log("Pas d'idForage fourni");
      setLoading(false);
      return;
    }
    
    const apiUrl = `${API_BASE_URL}/myapp/api/forage/${idForage}/phases/`;
    console.log("Appel API pour depth chart:", apiUrl);
    
    axios.get(apiUrl)
      .then(response => {
        console.log("Réponse API depth chart:", response.data);
        
        const { phases, zone, id_forage } = response.data;
        
        if (!phases || phases.length === 0) {
          console.log("Aucune phase trouvée pour le depth chart");
          setError("Aucune phase trouvée");
          setLoading(false);
          return;
        }
        
        // Store forage information
        setForageInfo({ zone, id_forage });

        // Transform phases data for the chart - create date sequence
        const transformedData = phases.map((phase, index) => {
          // Create a date sequence starting from today, going backwards or forwards
          const today = new Date();
          const phaseDate = new Date(today);
          phaseDate.setDate(today.getDate() + (index * 7)); // Add 7 days for each phase
          
          return {
            date: phaseDate.toLocaleDateString('fr-FR', { 
              month: 'short', 
              day: 'numeric' 
            }), // Format: "Jan 15"
            value: phase.depth || 0,
            phase: phase.nom_phase,
            etat: phase.etat,
            delai: phase.delai || 0,
            fullDate: phaseDate.toLocaleDateString('fr-FR')
          };
        });

        console.log("Données transformées pour depth chart:", transformedData);
        setChartData(transformedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des phases pour depth chart:", error);
        console.error("Détails de l'erreur:", error.response?.data);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      });
  }, [idForage]);

  // Custom tooltip to show phase information
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>{`Date: ${data.fullDate}`}</p>
          <p style={{ margin: '0', color: '#3B82F6' }}>{`Phase: ${data.phase}`}</p>
          <p style={{ margin: '0', color: '#3B82F6' }}>{`Profondeur: ${payload[0].value}m`}</p>
          <p style={{ margin: '0', color: '#666' }}>{`État: ${data.etat}`}</p>
          <p style={{ margin: '0', color: '#666' }}>{`Délai: ${data.delai} jours`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div style={{ background: "white", borderRadius: "10px", padding: "20px" }}>
        <p>Chargement des données de profondeur...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: "white", borderRadius: "10px", padding: "20px" }}>
        <p style={{ color: 'red' }}>Erreur: {error}</p>
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div style={{ background: "white", borderRadius: "10px", padding: "20px" }}>
        <p>Aucune donnée de profondeur disponible</p>
      </div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "10px", padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>
        Progress of Reached Depth 
      </h2>
      <p style={{ color: "#000000", marginBottom: "20px" }}>Depth Level by Phase</p>
       
      {/* Responsive chart container that adapts to parent size */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          {/* Gradient definition for the area fill */}
          <defs>
            <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
           
          {/* Chart grid lines and axes */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis 
            label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft', padding: 20 }} 
            reversed={true}
          />
          <Tooltip content={<CustomTooltip />} />
           
          {/* Visual elements */}
          <Area 
             type="monotone"
             dataKey="value"
             fill="url(#colorLine)"
          />
          <Line 
             type="monotone"
             dataKey="value"
             stroke="#3B82F6"
             strokeWidth={2}
             dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      
    </div>
  );
}