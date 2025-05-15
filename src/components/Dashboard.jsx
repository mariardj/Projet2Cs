import React from 'react';
import SidebarAndNavbar from './SidebarAndNavbar';
import StatsCards from './StatsCards';
import DrillingProgressChart from './DrillingProgressChart';
import ReservoirProgressChart from './ReservoirProgressChart';
import CostStatusGauge from './CostStatusGauge';

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#F6F4F2', minHeight: '100vh' }}>
      <SidebarAndNavbar />

      {/* Main content container */}
      <div style={{
        marginLeft: '240px',
        paddingTop: '50px',
        padding: '12px',
      }}>
        {/* Main dashboard layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          gap: '12px',
          alignItems: 'start'
        }}>
          {/* Left column - Main content */}
          <div>
            {/* Horizontal stats cards row */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '12px',
              overflowX: 'auto',
              paddingBottom: '5px'
            }}>
              <StatsCards />
            </div>
            
            {/* Compact Drilling Progress Chart */}
            <div style={{ 
              marginTop: '12px',
              transform: 'scale(0.85)',
              transformOrigin: 'top left',
              marginLeft: '-30px',
              width: '115%' // Compensate for scaling
            }}>
              <DrillingProgressChart />
            </div>

            {/* Compact Reservoir Chart */}
            <div style={{ 
              marginTop: '12px',
              transform: 'scale(0.85)',
              transformOrigin: 'top left',
              marginLeft: '-30px',
              width: '115%' // Compensate for scaling
            }}>
              <ReservoirProgressChart />
            </div>
          </div>

          {/* Right column - Side cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'sticky',
            top: '70px'
          }}>
            {/* Mini gauges */}
            <div style={{ 
              transform: 'scale(0.65)',
              transformOrigin: 'top left',
              marginLeft: '-40px',
              marginTop: '-20px'
            }}>
              <CostStatusGauge />
            </div>
            <div style={{ 
              transform: 'scale(0.65)',
              transformOrigin: 'top left',
              marginLeft: '-40px'
            }}>
              <CostStatusGauge />
            </div>
            <div style={{ 
              transform: 'scale(0.65)',
              transformOrigin: 'top left',
              marginLeft: '-40px'
            }}>
              <CostStatusGauge />
            </div>
            <div style={{ 
              transform: 'scale(0.65)',
              transformOrigin: 'top left',
              marginLeft: '-40px'
            }}>
              <CostStatusGauge />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;