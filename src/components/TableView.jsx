import React from 'react';
import sonat from '../assets/sonat.svg';

const TableView = () => {
  const tableData = [
    { id: '19984108', title: 'Tata Harrier and Safari Secure...', date: '17-Jan-2024 | 09:45 am', redaction: 'Tata Harrier' },
    { id: '19984109', title: 'Paying tribute to democracy...', date: '17-Jan-2024 | 09:50 am', redaction: 'Tribute' },
    { id: '19984110', title: "Congress's 'Ram Ram' to Ayodhya...", date: '18-Jan-2024 | 12:46 pm', redaction: 'Congress' },
    { id: '19984111', title: 'India-Maldives row: Tour packages...', date: '16-Jan-2024 | 03:45 pm', redaction: 'India-Maldives' },
    { id: '19984112', title: 'CM Yogi says 100 chartered planes...', date: '17-Jan-2024 | 09:45 am', redaction: 'CM Yogi' },
    { id: '19984113', title: 'Now 28, youngest eyewitness in...', date: '17-Jan-2024 | 09:50 am', redaction: 'Eyewitness' },
    { id: '19984114', title: 'Bengaluru startup CEO Suhana...', date: '18-Jan-2024 | 12:46 pm', redaction: 'Startup' },
  ];

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
    },
    td: {
      padding: '0.75rem 1rem',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '0.95rem',
      color: '#333',
    },
    sonat: {
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
            <th style={styles.th}>Added Date</th>
            <th style={styles.th}>Rédaction</th>
            <th style={styles.th}>View Dashboard</th>
            <th style={styles.th}>View File</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td style={styles.td}>{row.id}</td>
              <td style={styles.td}>{row.title}</td>
              <td style={styles.td}>{row.date}</td>
              <td style={styles.td}>{row.redaction}</td>
              <td style={styles.td}><img src={sonat} style={styles.sonat} alt="dashboard" /></td>
              <td style={styles.td}><img src={sonat} style={styles.sonat} alt="file" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
