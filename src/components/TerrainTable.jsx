import React, { useState, useMemo } from 'react';

const TerrainTable = () => {
  const newsData = [
    { id: '1998498', title: 'Noida Bank Employee Booked For...', date: '12-Jan-2024 | 08:53 am', addedBy: 'Admin' },
    { id: '1998499', title: 'Dunki Release LIVE Updates: SRK...', date: '13-Jan-2024 | 09:33 am', addedBy: 'Editor' },
    { id: '19984100', title: 'There\'s A Message in The Suspension...', date: '14-Jan-2024 | 08:30 am', addedBy: 'Reporter' },
    { id: '1998495', title: 'Noida Bank Employee Booked For...', date: '12-Jan-2024 | 08:53 am', addedBy: 'Admin' },
    { id: '1998494', title: 'Dunki Release LIVE Updates: SRK...', date: '13-Jan-2024 | 09:33 am', addedBy: 'Editor' },
    { id: '19984103', title: 'There\'s A Message in The Suspension...', date: '14-Jan-2024 | 08:30 am', addedBy: 'Reporter' },
    { id: '1998498', title: 'Noida Bank Employee Booked For...', date: '12-Jan-2024 | 08:53 am', addedBy: 'Admin' },
    { id: '1998499', title: 'Dunki Release LIVE Updates: SRK...', date: '13-Jan-2024 | 09:33 am', addedBy: 'Editor' },
    { id: '19984100', title: 'There\'s A Message in The Suspension...', date: '14-Jan-2024 | 08:30 am', addedBy: 'Reporter' },
    { id: '1998495', title: 'Noida Bank Employee Booked For...', date: '12-Jan-2024 | 08:53 am', addedBy: 'Admin' },
    { id: '1998494', title: 'Dunki Release LIVE Updates: SRK...', date: '13-Jan-2024 | 09:33 am', addedBy: 'Editor' },
    { id: '19984103', title: 'There\'s A Message in The Suspension...', date: '14-Jan-2024 | 08:30 am', addedBy: 'Reporter' },
  ];

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedData = useMemo(() => {
    let sortableData = [...newsData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (sortConfig.key === 'date') {
          const dateA = new Date(a.date.split(' | ')[0].split('-').reverse().join('-'));
          const dateB = new Date(b.date.split(' | ')[0].split('-').reverse().join('-'));
          return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [newsData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };
    
  const headerStyle = {
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'flex-start',  // Changer ici
    alignItems: 'center',
    gap: '5px'  // Ajouter un petit espace entre le titre et la flèche
  };

  const SortIcon = ({ direction }) => (
    <span style={{ marginLeft: '5px' }}>
      {direction === 'ascending' ? '↑' : '↓'}
    </span>
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        History Table of Reports
      </h2>

      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr 180px 120px',
        padding: '12px 15px',
        backgroundColor: '#f5f5f5',
        borderBottom: '2px solid #e0e0e0',
        fontWeight: 'bold',
        color: '#333'
      }}>
        <div style={headerStyle} onClick={() => requestSort('id')}>
          ID {sortConfig.key === 'id' && <SortIcon direction={sortConfig.direction} />}
        </div>
        <div style={headerStyle} onClick={() => requestSort('title')}>
          Title {sortConfig.key === 'title' && <SortIcon direction={sortConfig.direction} />}
        </div>
        <div style={headerStyle} onClick={() => requestSort('date')}>
          Added Date {sortConfig.key === 'date' && <SortIcon direction={sortConfig.direction} />}
        </div>
        <div style={headerStyle} onClick={() => requestSort('addedBy')}>
          Added By {sortConfig.key === 'addedBy' && <SortIcon direction={sortConfig.direction} />}
        </div>
      </div>

      {/* Body */}
      {currentItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr 180px 120px',
            padding: '15px',
            borderBottom: '1px solid #eee',
            backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa'
          }}
        >
          <div style={{ color: '#666', fontWeight: '500' }}>{item.id}</div>
          <div style={{ fontWeight: '600' }}>{item.title}</div>
          <div style={{ color: '#555', fontSize: '0.9em' }}>{item.date}</div>
          <div style={{ color: '#444', fontStyle: 'italic' }}>{item.addedBy}</div>
        </div>
      ))}

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderTop: '2px solid #e0e0e0',
        fontSize: '0.9em',
        color: '#666'
      }}>
        <div>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} entries</div>
        
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '5px 10px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            Previous
          </button>

          {/* Pagination numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              style={{
                padding: '5px 10px',
                border: '1px solid #ddd',
                backgroundColor: currentPage === i + 1 ? '#ddd' : '#fff',
                cursor: 'pointer',
                fontWeight: currentPage === i + 1 ? 'bold' : 'normal'
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '5px 10px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerrainTable;
