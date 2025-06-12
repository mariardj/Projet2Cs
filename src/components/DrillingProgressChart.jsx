import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DrillingProgressChart = ({ idForage }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Completion %",
        data: [],
        backgroundColor: [],
        borderRadius: 6,
        barThickness: 25,
      }
    ]
  });

  const [forageInfo, setForageInfo] = useState(null);

  useEffect(() => {
    if (!idForage) return;
    
    // Updated API endpoint to match your Django view
    const apiUrl = `${API_BASE_URL}/myapp/api/forage/${idForage}/phases/`;
    
    axios.get(apiUrl)
      .then(response => {
        const { phases, zone, id_forage } = response.data;
        
        // Store forage information
        setForageInfo({ zone, id_forage });

        const labels = [];
        const dataValues = [];
        const colors = [];

        phases.forEach(phase => {
          labels.push(phase.nom_phase);
          
          // Use delai (current delay) as the data value
          // You can modify this logic based on how you want to represent the data
          const delaiValue = phase.delai || 0;
          dataValues.push(Math.abs(delaiValue)); // Use absolute value for visualization

          // Color coding based on phase status
          switch (phase.etat) {
            case "significant delay":
              colors.push("#FF3C3C");
              break;
            case "on time":
              colors.push("#00B69B");
              break;
            case "slight delay":
              colors.push("#FF8500");
              break;
            default:
              colors.push("#EA00FF"); // In progress / unknown
          }
        });

        setChartData({
          labels,
          datasets: [{
            label: "Delay (days)",
            data: dataValues,
            backgroundColor: colors,
            borderRadius: 6,
            barThickness: 25,
          }]
        });
      })
      .catch(error => {
        console.error("Erreur lors du chargement des phases :", error);
      });
  }, [idForage]);

  const options = {
    indexAxis: 'x',
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#707790',
          callback: function (value) {
            return value + ' jours';
          }
        },
        grid: {
          color: '#F0F0F0'
        }
      },
      x: {
        ticks: {
          color: '#707790',
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw + ' jours de délai';
          }
        }
      },
      title: {
        display: false  // Désactiver le titre du chart.js
      }
    }
  };

  return (
    <div style={{
      maxWidth: '700px',
      margin: '40px auto',
      padding: '20px',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Titre au même style que ReservoirProgressChart */}
      <h2 style={{ marginBottom: "10px" }}>
        Drilling Progress Chart
      </h2>
      <p style={{ color: "#000000", marginBottom: "20px" }}>Delay Status by Phase</p>
      
      <Bar data={chartData} options={options} />
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: '#707790' }}>
        <div style={{ margin: '0 10px' }}>
          <span style={{ background: '#FF3C3C', borderRadius: '4px', display: 'inline-block', width: '12px', height: '12px', marginRight: '6px' }}></span>
          Delayed
        </div>
        <div style={{ margin: '0 10px' }}>
          <span style={{ background: '#00B69B', borderRadius: '4px', display: 'inline-block', width: '12px', height: '12px', marginRight: '6px' }}></span>
          On Time
        </div>
        <div style={{ margin: '0 10px' }}>
          <span style={{ background: '#FF8500', borderRadius: '4px', display: 'inline-block', width: '12px', height: '12px', marginRight: '6px' }}></span>
          Slightly Ahead
        </div>
        <div style={{ margin: '0 10px' }}>
          <span style={{ background: '#EA00FF', borderRadius: '4px', display: 'inline-block', width: '12px', height: '12px', marginRight: '6px' }}></span>
          In Progress
        </div>
      </div>
    </div>
  );
};

export default DrillingProgressChart;