import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NavBar from "./NavBar";
import mic from '../assets/mic.svg';
import excel from '../assets/excel.svg';
import SidebarAndNavbar from './SidebarAndNavbar';
import axios from 'axios';

// Data Models
class Rapport {
  constructor() {
    this.idrapport = uuidv4();
    this.numRapport = Math.floor(100000 + Math.random() * 900000);
    this.idforage = `F-${uuidv4().slice(0, 8)}`;
    this.dateActuelle = new Date().toISOString();
    this.depthActuel = '';
  }
}

class Remarque {
  constructor(rapportId) {
    this.idremarque = uuidv4();
    this.idrapport = rapportId;
    this.title = '';
    this.priority = 'Medium';
    this.observation = '';
    this.solution = '';
  }
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/myapp';
const API_ENDPOINTS = {
  UPLOAD_REPORT: `${API_BASE_URL}/upload-fichier/`,
};


const Home = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [remark, setRemark] = useState({
    title: '',
    priority: 'MEDIUM',
    observation: '',
    solution: ''
  });
    // Reset state after successful submission
const [userData, setUserData] = useState({
      userName: "User name",
      userEmail: "email@example.com",
      fullName: "Nom Inconnu",
      userId: null
    });
      useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserData({
        userName: storedUser?.registration_number || "User name",
        userEmail: storedUser?.email || "email@example.com",
        fullName: storedUser?.nom || "Nom Inconnu",
        userId: storedUser?.id || null
      });
    }, []);


  // File handling
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setExcelFile(file);
      setFileName(file.name);
    } else {
      alert('Please upload a valid Excel file (.xlsx or .xls)');
    }
  };

  const handleDragOver = e => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setExcelFile(file);
      setFileName(file.name);
    } else {
      alert('Please upload a valid Excel file (.xlsx or .xls)');
    }
  };

  // Remark handling
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleRemarkChange = e => {
    const { name, value } = e.target;
    setRemark(r => ({ ...r, [name]: value }));
  };

    // Submission handling
const handleSubmit = async () => {
  if (!excelFile ) {
    alert('Please upload a file ');
    return;
  }

  try {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('url', excelFile);
    formData.append('priority_remarque', remark.priority);
    formData.append('title', remark.title);
    formData.append('observation_remarque', remark.observation);
    formData.append('user', userData.userId.toString());  // Ensure it's a string
    formData.append('solution_remarque', remark.solution || '');

    // Debug what's being sent
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(API_ENDPOINTS.UPLOAD_REPORT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Success:', response.data);
    setSubmitSuccess(true);
    setTimeout(() => {
  setSubmitSuccess(false);
}, 3000);

  } catch (error) {
    console.error('Error:', error.response?.data);
    setSubmitError(error.response?.data || 'Submission failed');
setTimeout(() => {
  setSubmitError(null);
}, 3000);

  } finally {
    setIsSubmitting(false);
  }
};
  const handleCancel = () => {
    setExcelFile(null);
    setFileName('');
    setRemark({ title: '', priority: 'MEDIUM', observation: 'Test observation', solution: '', id_user: ''});
    setIsModalOpen(false);
    setSubmitError(null);
  };
  return (
    <div style={{ backgroundColor: '#F6F4F2', minHeight: '100vh' }}>
      <NavBar />

      <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 30, justifyContent: 'center', alignItems: 'stretch' }}>
          {/* Add Report Card */}
          <div style={{ backgroundColor: 'white', borderRadius: 8, border: '1px dashed #CCCCCC', flex: 1, maxWidth: 400, display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#E1EBF6', padding: 15, borderRadius: '8px 8px 0 0', borderBottom: '1px solid #CCCCCC' }}>
              <h2 style={{ color: '#333', fontSize: 18, margin: 0, textAlign: 'center' }}>Add a Report</h2>
            </div>

            <div
              style={{ padding: 25, textAlign: 'center', cursor: 'pointer', backgroundColor: isDragging ? '#f8f8f8' : 'white', transition: 'all 0.3s ease', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('excel-upload').click()}
            >
              <img src={excel} alt="Excel" style={{ width: 50, margin: '0 auto 15px', opacity: 0.7 }} />
              <p style={{ color: '#666', marginBottom: 15, fontSize: 14 }}>Drag and drop EXCEL file here, or</p>
              <button style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '8px 20px', borderRadius: 4, cursor: 'pointer', fontSize: 14, margin: '0 auto' }}>
                Browse Files
              </button>
              <p style={{ color: '#999', fontSize: 12, marginTop: 15 }}>Max Excel file size is 10MB</p>
            </div>

            <input id="excel-upload" type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={handleFileChange} />

            {fileName && (
              <p style={{ color: '#4CAF50', textAlign: 'center', padding: 15, fontSize: 13, borderTop: '1px solid #EEE' }}>
                Selected: {fileName}
              </p>
            )}
          </div>

          {/* Add Remark Card */}
          <div style={{ backgroundColor: 'white', borderRadius: 8, border: '1px dashed #CCCCCC', flex: 1, maxWidth: 400, display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#D9D9D9', padding: 15, borderRadius: '8px 8px 0 0', borderBottom: '1px solid #555' }}>
              <h2 style={{ color: '#777', fontSize: 18, margin: 0, textAlign: 'center' }}>Add a Remark to the Report</h2>
            </div>

            <div style={{ padding: 25, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <img src={mic} alt="Mic" style={{ width: 70, margin: '0 auto 15px', opacity: 0.7 }} />
              <p style={{ color: '#666', marginBottom: 15, fontSize: 14 }}>Fill out the remark form</p>
              <button
                onClick={excelFile ? openModal : null}
                disabled={!excelFile}
                style={{ backgroundColor: excelFile ? '#FF8500' : '#D9D9D9', color: 'white', border: 'none', padding: '8px 20px', borderRadius: 4, cursor: excelFile ? 'pointer' : 'not-allowed', fontSize: 14, margin: '0 auto' }}
              >
                Add Remark
              </button>
            </div>
          </div>
        </div>

        {/* Bottom buttons */}
        {excelFile && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 40 }}>
            <button onClick={handleCancel} style={{ backgroundColor: 'white', color: '#FF8500', border: 'none', padding: '10px 30px', borderRadius: 20, fontSize: 14, cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleSubmit} style={{ backgroundColor: '#FF8500', color: 'white', border: 'none', padding: '10px 30px', borderRadius: 20, fontSize: 14, cursor: 'pointer' }}>
              Submit
            </button>
            {submitSuccess && (
  <div style={{
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#e6ffed',
    color: '#2e7d32',
    padding: '16px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    textAlign: 'center',
    fontWeight: 'bold'
  }}>
    ✅ File imported successfully !
  </div>

)}
{submitError && (
  <div style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
    ❌ Erreur lors de l'envoi : {submitError}
  </div>
)}

          </div>
        )}
        
      </div>
      

      {/* Remark Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: 20, width: 600, maxWidth: '90%', padding: 30 }}>
            <h2 style={{ color: '#FF8500', textAlign: 'center', marginBottom: 20 }}>Add a remark</h2>

            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <label>Title</label>
                <input name="title" value={remark.title} onChange={handleRemarkChange} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #CCC' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Priority</label>
                <select name="priority" value={remark.priority} onChange={handleRemarkChange} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #CCC' }}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
              <div style={{ flex: 1 }}>
                <label>Observation</label>
                <textarea name="observation" value={remark.observation} onChange={handleRemarkChange} rows={4} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #CCC' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Solution</label>
                <textarea name="solution" value={remark.solution} onChange={handleRemarkChange} rows={4} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #CCC' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 15 }}>
              <button onClick={closeModal} style={{ backgroundColor: 'white', color: '#FF8500', border: 'none', padding: '8px 20px', borderRadius: 20, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={closeModal} style={{ backgroundColor: '#FF8500', color: 'white', border: 'none', padding: '8px 20px', borderRadius: 20, cursor: 'pointer' }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;