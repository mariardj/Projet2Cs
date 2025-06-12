import React from 'react';
import SidebarAndNavbar from './SidebarAndNavbar';
import StatsCards from './StatsCards';
import DrillingProgressChart from './DrillingProgressChart';
import ReservoirProgressChart from './ReservoirProgressChart';
import CostStatusGauge from './CostStatusGauge';
import DeadlineStatusGauge from './DeadlineStatusGauge';
import RemarqueCard from './RemarqueCard';
import ForageDelayStatusGauge from './ForageDelayStatusGauge';
import ForageCostStatusGauge from './ForageCostStatusGauge';

const Dashboard = ({ idForage }) => {
  return (
    <div style={{ backgroundColor: '#F6F4F2', minHeight: '100vh' }}>
      {/* Navbar and Sidebar */}
      <SidebarAndNavbar style={{ zIndex: '9999' }} />

      {/* Stats Cards */}
      <div
        style={{
          padding: '20px',
          paddingLeft: '18vw',
          paddingTop: '5vw',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
          }}
        >
          <StatsCards idForage={idForage} small={true} />
        </div>
      </div>

      {/* Charts + Gauges */}
      <div style={{ display: 'flex' }}>
        <div
          style={{
            marginLeft: '17vw',
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
            {/* Left: Charts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '100%' }}>
                <DrillingProgressChart idForage={idForage} />
              </div>
              <div style={{ width: '100%' }}>
                <ReservoirProgressChart idForage={idForage} />
              </div>
            </div>

            {/* Right: Gauges - Sans conteneur global */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              position: 'sticky',
              top: '80px',
              paddingRight: '10px' // Padding à droite maintenu
            }}>
              <div style={{ 
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '15px',
                width: '100%'
              }}>
                <CostStatusGauge idForage={idForage} />
              </div>
              
              <div style={{ 
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '15px',
                width: '100%'
              }}>
                <DeadlineStatusGauge idForage={idForage} />
              </div>
              
              <div style={{ 
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '15px',
                width: '100%'
              }}>
                <ForageCostStatusGauge idForage={idForage} />
              </div>
              
              <div style={{ 
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '15px',
                width: '100%'
              }}>
                <ForageDelayStatusGauge idForage={idForage} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remarque Card */}
      <div
        style={{
          marginLeft: '17vw',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '48rem', width: '100%' }}>
          <RemarqueCard  idForage={idForage}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// import React from 'react';
// import SidebarAndNavbar from './SidebarAndNavbar';
// import StatsCards from './StatsCards';
// import DrillingProgressChart from './DrillingProgressChart';
// import ReservoirProgressChart from './ReservoirProgressChart';
// import CostStatusGauge from './CostStatusGauge';
// import DeadlineStatusGauge from './DeadlineStatusGauge';
// import RemarqueCard from './RemarqueCard';
// import ForageDelayStatusGauge from './ForageDelayStatusGauge';
// import ForageCostStatusGauge from './ForageCostStatusGauge';

// const Dashboard = () => {
//   return (
//     <div style={{ backgroundColor: '#F6F4F2', minHeight: '100vh' }}>
//       {/* Navbar and Sidebar */}
//       <SidebarAndNavbar style={{ zIndex: '9999' }} />

//       {/* Stats Cards */}
//       <div
//         style={{
//           padding: '20px',
//           paddingLeft: '18vw',
//           paddingTop: '5vw',
//           boxSizing: 'border-box',
//         }}
//       >
//         <div
//           style={{
//     display: 'flex',
//     gap: '16px',
//     flexWrap: 'nowrap',
//     justifyContent: 'space-between',
//   }}
//         >
//           <StatsCards idForage={71} small={true} />
//         </div>
//       </div>

//       {/* Charts + Gauges */}
//       <div style={{ display: 'flex' }}>
//         <div
//           style={{
//             marginLeft: '17vw',
//             padding: '20px',
//             flex: 1,
//             boxSizing: 'border-box',
//           }}
//         >
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: '2fr 1fr',
//               gap: '20px',
//             }}
//           >
//             {/* Left: Charts */}
// <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//   <div style={{ width: '100%' }}>
//     <DrillingProgressChart />
//   </div>
//   <div style={{ width: '100%' }}>
//     <ReservoirProgressChart />
//   </div>
// </div>

// {/* Right: Gauges */}
// <div
//   style={{
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12rem', // vertical space between gauges
//     position: 'sticky',
//     top: '80px',
//     width: '80%',
//     paddingRight: '8rem', // space on the right side
//     alignItems: 'center',
//   }}
// >
//   <div style={{ width: '140px', height: '110px' }}>
//     <CostStatusGauge idForage={71} />
//   </div>
//   <div style={{ width: '140px', height: '110px' }}>
//     <DeadlineStatusGauge idForage={71} />
//   </div>
//   <div style={{ width: '140px', height: '110px' }}>
//     <ForageCostStatusGauge idForage={71} />
//   </div>
//   <div style={{ width: '140px', height: '110px' }}>
//     <ForageDelayStatusGauge idForage={71} />
//   </div>
// </div>





//           </div>
//         </div>
//       </div>

//       {/* Remarque Card */}
//       <div
//         style={{
//           marginLeft: '17vw',
//           padding: '20px',
//           boxSizing: 'border-box',
//         }}
//       >
//         <div style={{ maxWidth:'48rem', width: '100%' }}>
//           <RemarqueCard />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
