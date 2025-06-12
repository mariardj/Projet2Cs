import React, { useState, useEffect } from 'react';
import SidebarAndNavbar from './SidebarAndNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Notifications = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const navigate = useNavigate();

  const [notificationData, setNotificationData] = useState({
    ALL: { Analysed: 0, 'Not analysed': 0 },
    notifications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/myapp/public/notifications/', {
        params: { filter: activeTab.toLowerCase() }
      });

      // Vérification sécurisée de la structure de réponse
      const data = response.data || {};
      const results = data.results || [];
      const analysedCount = data.analysed_count || 0;
      const notAnalysedCount = data.not_analysed_count || 0;

      setNotificationData({
        ALL: {
          Analysed: analysedCount,
          NotAalysed: notAnalysedCount
        },
        notifications: results.map(item => ({
          id: item.id || Date.now(), // Fallback ID
          message: item.message || "Nouvelle notification",
          time_ago: item.time_ago || "Récemment",
          analysed: !!item.analysed,
          forage_info: item.forage_info || "Non spécifié",
          id_forage: item.id_forage || item.forage_id || null
        }))
      });
      console.log('Notifications sssssssssssssssssssssdata:', results);
      
      setError(null);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.response?.data?.message || err.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 300000); // Actualisation toutes 5 minutes
    return () => clearInterval(interval);
  }, [activeTab]);

 const handleAnalyse = async (notificationId) => {
  try {
    // Récupérer la notification concernée
    const notif = notificationData.notifications.find(n => n.id === notificationId);
    if (!notif) {
      console.warn("Notification introuvable.");
      return;
    }

    // Extraire l'ID du forage - CORRECTION ICI
    const idForage = notif.id_forage;

    if (!idForage || idForage === 0) {
      console.warn("Aucun ID de forage trouvé pour cette notification.");
      alert("Cette notification n'est pas liée à un forage spécifique.");
      return;
    }

    // Requête pour marquer la notification comme analysée
    await axios.post('http://127.0.0.1:8000/myapp/public/notifications/', {
      notification_id: notificationId
    });

    // Mise à jour de l'état local pour refléter le changement
    setNotificationData(prev => {
      const updatedNotifications = prev.notifications.map(n =>
        n.id === notificationId ? { ...n, analysed: true } : n
      );

      const analysedCount = updatedNotifications.filter(n => n.analysed).length;
      const notAnalysedCount = updatedNotifications.length - analysedCount;

      return {
        ...prev,
        notifications: updatedNotifications,
        ALL: {
          'Not analysed': notAnalysedCount,
          'Analysed': analysedCount
        }
      };
    });

    // Redirection vers le dashboard avec l'ID du forage
    navigate(`/dashboard/${idForage}`);

  } catch (err) {
    console.error("Erreur lors de l'analyse de la notification :", err);
    alert("Erreur lors de l'analyse de la notification.");
  }
};



  const handleManualRefresh = () => {
    fetchNotifications();
  };

if (loading) return (
    <div style={styles.container}>
      <SidebarAndNavbar />
      <div style={styles.content}>
        <h1 style={styles.title}>Notifications</h1>
        <p>Chargement en cours...</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={styles.container}>
      <SidebarAndNavbar />
      <div style={styles.content}>
        <h1 style={styles.title}>Notifications</h1>
        <div style={styles.errorBox}>
          Erreur: {error}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <SidebarAndNavbar />
      <div style={styles.content}>
        <h1 style={styles.title}>Notifications</h1>

        {/* Onglets de filtrage */}
        <div style={styles.tabsContainer}>
          {['ALL', 'Analysed', 'Not analysed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab && styles.activeTab)
              }}
            >
              {tab === 'ALL' ? 'ALL ' : tab.toUpperCase()}
              {tab === 'ALL' ? 
                notificationData.notifications.length :
              tab === 'Analysed' ? 
                notificationData.notifications.filter(n => n.analysed).length :
                notificationData.notifications.filter(n => !n.analysed).length}
            </button>
          ))}
        </div>

        {/* Liste des notifications */}
        <div style={styles.notificationsContainer}>
          {notificationData.notifications.length > 0 ? (
            notificationData.notifications
  .filter((notification) => {
    if (activeTab === 'Analysed') return notification.analysed;
    if (activeTab === 'Not analysed') return !notification.analysed;
    return true; // 'ALL'
  })
  .map((notification) => (

              <div key={notification.id} style={styles.notificationItem}>
                <div style={styles.notificationContent}>
                  <div style={{
                    ...styles.statusIndicator,
                    backgroundColor: notification.analysed ? '#4CAF50' : '#FF8500'
                  }} />
                  <div>
                    <div style={styles.notificationMessage}>{notification.message}</div>
                    <div style={styles.notificationMeta}>
                      {notification.forage_info} • {notification.time_ago}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAnalyse(notification.id)}
                  disabled={notification.analysed}
                  style={{
                    ...styles.analyseButton,
                    ...(notification.analysed && styles.analysedButton)
                  }}
                >
                  {notification.analysed ? (
                    <>
                      <span style={styles.checkIcon}>✓</span> Analysé
                    </>
                  ) : (
                    'Analyser'
                  )}
                </button>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              Aucune notification disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#F6F4F2',
    minHeight: '100vh',
    display: 'flex'
  },
  content: {
    marginLeft: '240px',
    paddingTop: '120px',
    padding: '20px',
    width: 'calc(100% - 240px)',
    maxWidth: '1200px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333'
  },
  errorBox: {
    color: '#D32F2F',
    backgroundColor: '#FFEBEE',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  tabsContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    borderBottom: '1px solid #E0E0E0',
    paddingBottom: '10px'
  },
  tabButton: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: '#666',
    padding: '5px 10px',
    cursor: 'pointer',
    fontWeight: 'normal',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  activeTab: {
    color: '#FF8500',
    fontWeight: 'bold',
    borderBottomColor: '#FF8500'
  },
  tabCount: {
    backgroundColor: '#E0E0E0',
    color: '#666',
    borderRadius: '10px',
    padding: '2px 8px',
    fontSize: '12px'
  },
  notificationsContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  notificationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f5f5f5'
  },
  notificationContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  statusIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0
  },
  notificationMessage: {
    fontWeight: '500',
    color: '#333'
  },
  notificationMeta: {
    fontSize: '13px',
    color: '#666',
    marginTop: '4px'
  },
  analyseButton: {
    padding: '8px 16px',
    backgroundColor: '#FF8500',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    minWidth: '100px',
    transition: 'all 0.2s ease'
  },
  analysedButton: {
    backgroundColor: 'transparent',
    color: '#4CAF50',
    border: '1px solid #4CAF50',
    cursor: 'default'
  },
  checkIcon: {
    marginRight: '5px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666',
    fontSize: '16px'
  },
  notificationWrapper: {
  position: 'relative',
  display: 'inline-block',
  marginRight: '20px',
},

iconAndText: {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: 'orange',
  fontSize: '16px',
},

notificationText: {
  fontWeight: 'bold',
},

badge: {
  position: 'absolute',
  top: '-5px',
  right: '-10px',
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '50%',
  padding: '2px 6px',
  fontSize: '12px',
  fontWeight: 'bold',
  minWidth: '20px',
  textAlign: 'center',
},

};

export default Notifications;