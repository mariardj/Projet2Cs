import React, { useState } from 'react';
import SidebarAndNavbar from './SidebarAndNavbar';
import TableView from './TableView';
import Dashboardsview from './Dashboardsview';
import Filesview from './Filesview';
import ViewsFilter from './ViewsFilter';

const ReportsPage = () => {
  const [selectedView, setSelectedView] = useState('Table View');

  const renderView = () => {
    switch (selectedView) {
      case 'Table View':
        return <TableView />;
      case 'Dashboards View':
        return <Dashboardsview />;
      case 'Files View':
        return <Filesview />;
      default:
        return <TableView />;
    }
  };

  return (
    <div className="reports-page" style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
       <SidebarAndNavbar /> 
       <div
  style={{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
    marginLeft: '17vw', // compensate for sidebar
    marginTop: '60px',  // compensate for navbar
    minHeight: 'calc(100vh - 60px)', // ensure full height after navbar
    boxSizing: 'border-box'
  }}
>
  <ViewsFilter selectedView={selectedView} onSelect={setSelectedView} />
  {renderView()}
</div>


    </div>
    
  );
};

export default ReportsPage;
