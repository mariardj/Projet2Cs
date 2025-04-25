import React, { useState } from 'react';
import SidebarAndNavbar from './SidebarAndNavbar';

// Sample notifications data
const notifications = [
  {
    id: 1,
    project: 'Région01 ForageX02 PhaseY',
    message: 'Someone sent a report',
    timestamp: 'about 13 hours ago',
    status: 'pending',
  },
  {
    id: 2,
    project: 'Région01 ForageX02 PhaseY',
    message: 'Someone sent a report',
    timestamp: 'about 13 hours ago',
    status: 'analysed',
  },
  {
    id: 3,
    project: 'Région01 ForageX02 PhaseY',
    message: 'Someone sent a report',
    timestamp: 'about 13 hours ago',
    status: 'pending',
  },
  {
    id: 4,
    project: 'Région01 ForageX02 PhaseY',
    message: 'Someone sent a report',
    timestamp: 'about 13 hours ago',
    status: 'analysed',
  },
  {
    id: 5,
    project: 'Région01 ForageX02 PhaseY',
    message: 'Someone sent a report',
    timestamp: 'about 13 hours ago',
    status: 'pending',
  },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'Analysed') return notification.status === 'analysed';
    if (activeTab === 'Not analysed') return notification.status === 'pending';
    return false;
  });

  return (
    <div style={{ backgroundColor: '#F6F4F2', minHeight: '100vh' }}>
      <SidebarAndNavbar />

      {/* Ensure content starts below navbar and beside sidebar */}
      <div
        style={{
          marginLeft: '240px', // adjust based on sidebar width
          paddingTop: '120px', // increased to clear navbar
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Notifications
        </h1>

        {/* Tab navigation */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '20px',
            borderBottom: '1px solid #E0E0E0',
          }}
        >
          <span
            onClick={() => setActiveTab('ALL')}
            style={{
              cursor: 'pointer',
              borderBottom: activeTab === 'ALL' ? '2px solid #FF8500' : 'none',
              paddingBottom: '5px',
              color: activeTab === 'ALL' ? '#FF8500' : '#666',
            }}
          >
            ALL
          </span>
          <span
            onClick={() => setActiveTab('Analysed')}
            style={{
              cursor: 'pointer',
              borderBottom: activeTab === 'Analysed' ? '2px solid #FF8500' : 'none',
              paddingBottom: '5px',
              color: activeTab === 'Analysed' ? '#FF8500' : '#666',
            }}
          >
            Analysed
          </span>
          <span
            onClick={() => setActiveTab('Not analysed')}
            style={{
              cursor: 'pointer',
              borderBottom: activeTab === 'Not analysed' ? '2px solid #FF8500' : 'none',
              paddingBottom: '5px',
              color: activeTab === 'Not analysed' ? '#FF8500' : '#666',
            }}
          >
            Not analysed
          </span>
        </div>

        {/* Notifications list */}
        <div>
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #E0E0E0',
              }}
            >
              {/* Bullet point and project name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#FF8500', fontSize: '18px' }}>•</span>
                <span style={{ fontWeight: 'bold' }}>{notification.project}</span>
              </div>

              {/* Avatar, message, and timestamp */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#FF8500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: '#FFF', fontSize: '12px' }}>P</span>
                </div>
                <span style={{ fontSize: '14px' }}>
                  {notification.message} • {notification.timestamp}
                </span>
              </div>

              {/* Action button */}
              <button
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  ...(
                    notification.status === 'pending'
                      ? {
                          backgroundColor: '#FF8500',
                          color: '#FFF',
                        }
                      : {
                          backgroundColor: '#FFF',
                          color: '#FF8500',
                          border: '2px solid #FF8500',
                        }
                  ),
                }}
              >
                {notification.status === 'pending' ? 'Analyse it' : 'Analysed'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;