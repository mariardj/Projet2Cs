import React, { useState } from 'react';

import file2 from '../assets/file2.svg';
import dash from '../assets/dash.svg';

const TableView = () => {
  const tableData = [
    { id: '19984108', title: 'Tata Harrier and Safari Secure...', date: '17-Jan-2024 | 09:45 am', region: 'Tata Harrier' },
    { id: '19984109', title: 'Paying tribute to democracy...', date: '17-Jan-2024 | 09:50 am', region: 'Tribute' },
    { id: '19984110', title: "Congress's 'Ram Ram' to Ayodhya...", date: '18-Jan-2024 | 12:46 pm', region: 'Congress' },
    { id: '19984111', title: 'India-Maldives row: Tour packages...', date: '16-Jan-2024 | 03:45 pm', region: 'India-Maldives' },
    { id: '19984112', title: 'CM Yogi says 100 chartered planes...', date: '17-Jan-2024 | 09:45 am', region: 'CM Yogi' },
    { id: '19984113', title: 'Now 28, youngest eyewitness in...', date: '17-Jan-2024 | 09:50 am', region: 'Eyewitness' },
    { id: '19984114', title: 'Bengaluru startup CEO Suhana...', date: '18-Jan-2024 | 12:46 pm', region: 'Startup' },
  ];

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedData = [...tableData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === 'date') {
      aValue = new Date(aValue.split('|')[0].trim());
      bValue = new Date(bValue.split('|')[0].trim());
    } else {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const styles = {
    container: {
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f6fa',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.5rem',
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    th: {
      backgroundColor: '#f9f9f9',
      padding: '0.75rem 1rem',
      textAlign: 'left',
      fontWeight: '600',
      borderBottom: '2px solid #eee',
      cursor: 'pointer',
    },
    td: {
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '0.95rem',
      color: '#333',
    },
    dash: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
    },
    file2: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Reports History</h1>
        <div style={styles.buttonGroup}>
          <button style={styles.button}>Table View</button>
          <button style={styles.button}>Files View</button>
          <button style={styles.button}>Dashboard View</button>
        </div>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th} onClick={() => requestSort('date')}>Added Date {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th style={styles.th} onClick={() => requestSort('region')}>Region {sortConfig.key === 'region' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th style={styles.th}><div>View</div><div>Dashboard</div></th>
            <th style={styles.th}><div>View</div><div>File</div></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              <td style={styles.td}>{row.id}</td>
              <td style={styles.td}>{row.title}</td>
              <td style={styles.td}>{row.date}</td>
              <td style={styles.td}>{row.region}</td>
              <td style={styles.td}><img src={dash} style={styles.dash} alt="dashboard" /></td>
              <td style={styles.td}><img src={file2} style={styles.file2} alt="file" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
