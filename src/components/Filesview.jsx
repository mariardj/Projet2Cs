import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAndNavbar from './SidebarAndNavbar';
import fileIcon from '../assets/file.svg';

const Filesview = () => {
  const [view, setView] = useState('Files View');
  const [filterDate, setFilterDate] = useState('');
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
  return (
    <div style={{ backgroundColor: '#F6F4F2', minHeight: '100vh' }}>
      <div
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
       

         
        </div>


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
              onClick={() => console.log(`Clicked ${fileItem.url}`)}
              style={{
              //  background: '#FFF',
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
                style={{ width: '60px', height: '60px' }}
              />
              <span style={{ marginTop: '10px', fontWeight: '500', fontSize: '14px', textAlign: 'center' }}>
                {fileItem.url}
              </span>
              <span style={{ marginTop: '4px', fontSize: '12px', color: '#666' }}>
                {fileItem.date_upload}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Filesview;
