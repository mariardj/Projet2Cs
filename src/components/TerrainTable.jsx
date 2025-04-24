import React, { useState } from 'react';

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
    { id: '1998499', title: 'Dunki Release LIVE Updates: SRK...', date: '13-Jan-2024 | 09:33 am', addedBy: 'Editor' },
    { id: '19984100', title: 'There\'s A Message in The Suspension...', date: '14-Jan-2024 | 08:30 am', addedBy: 'Reporter' },
    { id: '1998495', title: 'Noida Bank Employee Booked For...', date: '12-Jan-2024 | 08:53 am', addedBy: 'Admin' },
    { id: '1998494', title: 'Dunki Release LIVE Updates: SRK...', date: '13-Jan-2024 | 09:33 am', addedBy: 'Editor' },
    { id: '19984103', title: 'There\'s A Message in The Suspension...', date: '14-Jan-2024 | 08:30 am', addedBy: 'Reporter' },
   
  ];

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = newsData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#fff' }}>
      {/* Table Header */}
      <h2 style={{
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  }}> 
    History Table of Reports
  </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr 180px 120px',
        padding: '12px 15px',
        backgroundColor: '#f5f5f5',
        borderBottom: '2px solid #e0e0e0',
        fontWeight: 'bold',
        color: '#333'
      }}>
        <div>ID</div>
        <div>Title</div>
        <div>Added Date</div>
        <div>Added By</div>
      </div>

      {/* Table Body */}
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
        <div>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, newsData.length)} of {newsData.length} entries</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrevious}
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
          <button
            onClick={handleNext}
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
