 import React, { useState, useEffect } from 'react';
 import axios from 'axios';

import file2 from '../assets/file2.svg';
import dash from '../assets/dash.svg';

const TableView = ({ filterDate }) => {


   const [view, setView] = useState('Files View');
   
   const [files, setFiles] = useState([]);
   const [loading, setLoading] = useState(true);
 
   // Fetch uploaded files from backend
   useEffect(() => {
     const fetchFiles = async () => {
       try {
         const response = await axios.get('http://127.0.0.1:8000/myapp/upload-fichier/');
         console.log('Files API response:', response.data);
 
         // On suppose que response.data est un tableau de fichiers
         setFiles(response.data);
       } catch (error) {
         console.error('Error fetching files:', error);
       } finally {
         setLoading(false);
       }
     };
 
     fetchFiles();
   }, []);
 
   // Optionnel : filtrage par date
   const filteredFiles = files.filter(file => {
     if (!filterDate) return true;
 
     const fileDate = new Date(file.date_upload);
     const now = new Date();
 
     if (filterDate === 'Today') {
       return fileDate.toDateString() === now.toDateString();
     } else if (filterDate === 'Last 7 Days') {
       const sevenDaysAgo = new Date(now);
       sevenDaysAgo.setDate(now.getDate() - 7);
       return fileDate >= sevenDaysAgo;
     } else if (filterDate === 'Last 30 Days') {
       const thirtyDaysAgo = new Date(now);
       thirtyDaysAgo.setDate(now.getDate() - 30);
       return fileDate >= thirtyDaysAgo;
     }
 
     return true;
   });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const sortedData = [...filteredFiles].sort((a, b) => {
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

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredFiles.length / rowsPerPage);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const styles = {
  
    header: {
      cursor: 'pointer',
      userSelect: 'none',
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
    pagination: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    pageButton: {
      padding: '0.4rem 0.8rem',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    activePageButton: {
      backgroundColor: '#FF8500',
      color: '#fff',
      border: '1px solid #e84118',
    }
  };

  return (
    <div >
      {/* <div style={styles.header}>
        <h1 style={styles.title}>Reports History</h1>
        <div style={styles.buttonGroup}>
          <button style={styles.button}>Table View</button>
          <button style={styles.button}>Files View</button>
          <button style={styles.button}>Dashboard View</button>
        </div>
      </div> */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th} onClick={() => requestSort('date')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                Added Date {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
              </div>
            </th>
            <th style={styles.th} onClick={() => requestSort('region')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                Region {sortConfig.key === 'region' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
              </div>
            </th>
            <th style={styles.th}><div>View</div><div>Dashboard</div></th>
            <th style={styles.th}><div>View</div><div>File</div></th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td style={styles.td}>{row.id_rapport_imported}</td>
              <td style={styles.td}>{row.url.split('/').pop()}</td>
              <td style={styles.td}>{row.date_upload}</td>
              <td style={styles.td}>{row.region}</td>
              <td style={styles.td}><img src={dash} style={styles.dash} alt="dashboard" /></td>
              <td style={styles.td}><img src={file2} style={styles.file2} alt="file" /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          style={styles.pageButton}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            style={{
              ...styles.pageButton,
              ...(currentPage === index + 1 ? styles.activePageButton : {}),
            }}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          style={styles.pageButton}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableView;
