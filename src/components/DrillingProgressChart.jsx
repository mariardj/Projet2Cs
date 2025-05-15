import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DrillingProgressChart = () => {
  const data = {
    labels: [
      '26" x 20"',
      '16" x 13 3/8"',
      '12 1/4" x 9 5/8"',
      '8 1/2" x 7"'
    ],
    datasets: [
      {
        label: "Completion %",
        data: [100, 100, 100, 40],
        backgroundColor: [
          '#FF3C3C', // Delayed
          '#00B69B', // On Time
          '#FF8500', // Slightly Ahead
          '#EA00FF', // In Progress
        ],
        borderRadius: 6,
        barThickness: 25,
      }
    ]
  };

  const options = {
    indexAxis: 'x',
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#707790',
          callback: function(value) {
            return value + '%';
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
          label: function(context) {
            return context.raw + '% completed';
          }
        }
      },
      title: {
        display: true,
        text: 'Progression Chart by Drilling Phase',
        color: '#000',
        font: {
          size: 20
        },
        padding: {
          top: 10,
          bottom: 20
        }
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
      <Bar data={data} options={options} />
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
