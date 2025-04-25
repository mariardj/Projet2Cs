import React, { useState } from 'react';
import SidebarAndNavbar from './SidebarAndNavbar';
import fileIcon from '../assets/file.svg';

// Sample files with varying titles and dates
const baseFiles = [
  { title: 'Spreadsheet.csv', date: '27 May 2020' },
  { title: 'Report_annual.pdf', date: '30 May 2020' },
  { title: 'Pitch_sales.ppt', date: '05 Jun 2020' },
  { title: 'Presentations.doc', date: '10 Jun 2020' }
];

const Filesview = () => {
  const [view, setView] = useState('Files View');
  const [filterDate, setFilterDate] = useState('');

  // Generate list of 15 file objects with varying dates
  const files = Array.from({ length: 15 }, (_, i) => baseFiles[i % baseFiles.length]);

  return (
    <div style={{ backgroundColor: '#F6F4F2', minHeight: '100vh' }}>
      <SidebarAndNavbar />

      {/* Ensure content starts below navbar and beside sidebar */}
      <div
        style={{
          marginLeft: '240px',   // adjust based on sidebar width
          paddingTop: '120px',    // increased to clear navbar
          paddingLeft: '20px',
          paddingRight: '20px'
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Reports History
        </h1>

        {/* View & Date filter controls */}
        {/* View & Date filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
          <select
            value={view}
            onChange={e => setView(e.target.value)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#FFF',
              border: '2px solid #FF8500',
              borderRadius: '40px',
              color: '#FF8500',
              cursor: 'pointer'
            }}
          >
            <option>Files View</option>
            <option>Dashboard View</option>
            <option>Table View</option>
          </select>

          <select
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#FFF',
              border: '2px solid #FF8500',
              borderRadius: '30px',
              color: '#FF8500',
              cursor: 'pointer'
            }}
          >
            <option value="">Filter Selon la Date</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        {/* Files grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '20px'
          }}
        >
          {files.map((fileItem, idx) => (
            <div
              key={idx}
              onClick={() => console.log(`Clicked ${fileItem.title}`)}
              style={{
                background: '#FFF',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={fileIcon}
                alt="file"
                style={{ width: '40px', height: '40px' }}
              />
              <span style={{ marginTop: '10px', fontWeight: '500', fontSize: '14px', textAlign: 'center' }}>
                {fileItem.title}
              </span>
              <span style={{ marginTop: '4px', fontSize: '12px', color: '#666' }}>
                {fileItem.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filesview;
