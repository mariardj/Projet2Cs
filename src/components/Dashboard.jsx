import React from 'react';
import SidebarAndNavbar from './SidebarAndNavbar';
import StatsCards from './StatsCards';
import DrillingProgressChart from './DrillingProgressChart';
import ReservoirProgressChart from './ReservoirProgressChart';
import CostStatusGauge from './CostStatusGauge';

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#F6F4F2', minHeight: '100vh' }}>
      {/* Always render this first so it's on top */}
      <SidebarAndNavbar  style={{
       zIndex: "9999", // Make it very high
        }} />

      {/* Stats cards BELOW the navbar */}
      <div
        style={{
          padding: '20px',
          paddingLeft: '18vw', // align with sidebar
          boxSizing: 'border-box',
          paddingTop: '5vw', // add enough space to clear the navbar
   
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <StatsCards />
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div style={{ display: 'flex' }}>
        {/* No Sidebar here anymore — it's inside SidebarAndNavbar */}
        
        {/* Main Content */}
        <div
          style={{
            marginLeft: '17vw',
            paddingTop: '20px',
            padding: '20px',
            flex: 1,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '20px',
            }}
          >
            {/* Charts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <DrillingProgressChart />
              <ReservoirProgressChart />
            </div>

            {/* Smaller Cost Gauges */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'sticky',
                top: '80px',
              }}
            >
              <CostStatusGauge small />
              <CostStatusGauge small />
              <CostStatusGauge small />
              <CostStatusGauge small />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
