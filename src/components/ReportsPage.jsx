import React, { useState } from 'react';
import SidebarAndNavbar from './SidebarAndNavbar';
import TableView from './TableView';
import Dashboardsview from './Dashboardsview';
import Filesview from './Filesview';
import ViewsFilter from './ViewsFilter';
import DateFilter from './DateFilter';

const ReportsPage = () => {
  const [selectedView, setSelectedView] = useState('Table View');
const [filterDate, setFilterDate] = useState('');



const renderView = () => {
  switch (selectedView) {
    case 'Table View':
      return <TableView filterDate={filterDate}/>;
    case 'Dashboards View':
      return <Dashboardsview filterDate={filterDate} />;
    case 'Files View':
      return <Filesview filterDate={filterDate} />;
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
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
  <ViewsFilter selectedView={selectedView} onSelect={setSelectedView} />
  <DateFilter selectedDate={filterDate} onSelect={setFilterDate} />
</div>
{renderView()}

  
</div>


    </div>
    
  );
};

export default ReportsPage;
