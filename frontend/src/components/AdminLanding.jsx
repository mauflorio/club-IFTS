import React, { useState, useEffect } from 'react';

// Iconos simples con emojis
const Home = () => <span>🏠</span>;
const User = () => <span>👤</span>;
const Settings = () => <span>⚙️</span>;
const Users = () => <span>👥</span>;
const Calendar = () => <span>📅</span>;
const Trophy = () => <span>🏆</span>;
const AlertCircle = () => <span>⚠️</span>;
const X = () => <span>✕</span>;

const AdminLandingPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Simulación de datos administrables
  const adminItems = [
    { id: 1, type: 'Usuarios', count: 245, icon: Users, description: 'Gestionar usuarios del sistema', path: '/admin/usuarios' },
    { id: 2, type: 'Eventos', count: 18, icon: Calendar, description: 'Administrar eventos deportivos', path: '/admin/eventos' },
    { id: 3, type: 'Competencias', count: 12, icon: Trophy, description: 'Gestionar competencias y torneos', path: '/admin/competencias' },
    { id: 4, type: 'Configuración', count: 5, icon: Settings, description: 'Configuración del sistema', path: '/admin/configuracion' }
  ];

  // Simulación de carga de perfil de administrador
  useEffect(() => {
    let mounted = true; // Flag para evitar memory leaks

    const loadAdminProfile = async () => {
      try {
        if (!mounted) return;
        setLoading(true);
        
        // Simulamos una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulamos un error ocasional (20% de probabilidad)
        if (Math.random() < 0.2) {
          throw new Error('Error al cargar el perfil de administrador');
        }
        
        // Usuario administrador simulado
        if (mounted) {
          setUser({
            id: 1,
            name: 'Juan Pérez',
            email: 'admin@deportes.com',
            role: 'Administrador',
            avatar: '/api/placeholder/40/40'
          });
        }
        
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setShowErrorModal(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAdminProfile();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, []);

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    // CA03: Redireccionamiento a home
    redirectToHome();
  };

  const redirectToHome = () => {
    // Navegación real a la página principal
    window.location.href = '/';
    // O si tienes una ruta específica para home:
    // window.location.href = '/home';
  };

  const handleHomeClick = () => {
    // Navegación real al home
    window.location.href = '/';
    // O si usas React Router, puedes usar:
    // navigate('/');
  };

  const handleProfileClick = () => {
    // Navegación real al perfil
    window.location.href = '/perfil';
    // O si usas React Router:
    // navigate('/perfil');
  };

  const handleAdminItemClick = (item) => {
    // Navegación real a la sección administrativa correspondiente
    window.location.href = item.path;
    // O si usas React Router:
    // navigate(item.path);
  };

  // Función para manejar navegación con React Router (si lo usas)
  const navigateWithRouter = (path) => {
    // Si estás usando React Router v6:
    // const navigate = useNavigate();
    // navigate(path);
    
    // Si estás usando React Router v5:
    // const history = useHistory();
    // history.push(path);
    
    // Por ahora uso window.location como fallback
    window.location.href = path;
  };

  // Estilos CSS en JS
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    logoIcon: {
      fontSize: '24px',
      marginRight: '8px'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#111827'
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      color: '#6b7280',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s',
      textDecoration: 'none'
    },
    navButtonHover: {
      color: '#2563eb',
      backgroundColor: '#f3f4f6'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 16px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      marginBottom: '32px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    cardHover: {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-1px)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    iconContainer: {
      padding: '12px',
      backgroundColor: '#dbeafe',
      borderRadius: '8px',
      fontSize: '20px'
    },
    count: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '8px'
    },
    cardDescription: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '16px'
    },
    cardFooter: {
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb'
    },
    cardLink: {
      fontSize: '14px',
      color: '#2563eb',
      fontWeight: '500'
    },
    summary: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    summaryTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '16px'
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '16px',
      textAlign: 'center'
    },
    summaryItem: {
      padding: '16px',
      borderRadius: '8px'
    },
    summaryNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    summaryLabel: {
      fontSize: '14px',
      color: '#6b7280'
    },
    loadingContainer: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '3px solid #e5e7eb',
      borderTop: '3px solid #2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 16px'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      maxWidth: '400px',
      width: '90%',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    modalTitle: {
      display: 'flex',
      alignItems: 'center'
    },
    modalIcon: {
      color: '#ef4444',
      marginRight: '8px',
      fontSize: '20px'
    },
    modalTitleText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      fontSize: '16px',
      padding: '4px',
      borderRadius: '4px',
      transition: 'color 0.2s'
    },
    modalText: {
      color: '#6b7280',
      marginBottom: '24px',
      lineHeight: '1.5'
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    acceptButton: {
      padding: '8px 16px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    }
  };

  // CA02: Modal de error
  const ErrorModal = () => (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <div style={styles.modalTitle}>
            <span style={styles.modalIcon}>
              <AlertCircle />
            </span>
            <h3 style={styles.modalTitleText}>Error de Acceso</h3>
          </div>
          <button 
            onClick={handleErrorModalClose} 
            style={styles.closeButton}
            onMouseEnter={(e) => e.target.style.color = '#374151'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
          >
            <X />
          </button>
        </div>
        <p style={styles.modalText}>
          Existe un problema para acceder al panel de administración. 
          Por favor, inténtelo en otra oportunidad.
        </p>
        <div style={styles.modalFooter}>
          <button 
            onClick={handleErrorModalClose} 
            style={styles.acceptButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );

  // Pantalla de carga
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={{ textAlign: 'center' }}>
          <div style={styles.spinner}></div>
          <p style={{ color: '#6b7280' }}>Cargando panel de administración...</p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  // CA01: Panel de administrador exitoso
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          {/* Logo y navegación */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div 
              style={styles.logo}
              onClick={handleHomeClick}
            >
              <span style={styles.logoText}>ClubIFTS Admin</span>
            </div>
            
            {/* Acceso al home */}
            <button 
              onClick={handleHomeClick} 
              style={styles.navButton}
              onMouseEnter={(e) => {
                e.target.style.color = styles.navButtonHover.color;
                e.target.style.backgroundColor = styles.navButtonHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.navButton.color;
                e.target.style.backgroundColor = styles.navButton.backgroundColor;
              }}
            >
              <span style={{ marginRight: '8px' }}><Home /></span>
              Inicio
            </button>
          </div>

          {/* Acceso al perfil */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              Bienvenido, <span style={{ fontWeight: '500' }}>{user?.name}</span>
            </span>
            <button 
              onClick={handleProfileClick} 
              style={styles.navButton}
              onMouseEnter={(e) => {
                e.target.style.color = styles.navButtonHover.color;
                e.target.style.backgroundColor = styles.navButtonHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.navButton.color;
                e.target.style.backgroundColor = styles.navButton.backgroundColor;
              }}
            >
              <span style={{ marginRight: '8px' }}><User /></span>
              Perfil
            </button>
          </div>
        </div>
      </header>

      {/* Cuerpo - Grilla de elementos administrables */}
      <main style={styles.main}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={styles.title}>Panel de Administración</h1>
          <p style={styles.subtitle}>Gestiona todos los aspectos del sistema del club desde aquí</p>
        </div>

        {/* Grilla de elementos administrables */}
        <div style={styles.grid}>
          {adminItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleAdminItemClick(item)}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                  e.currentTarget.style.transform = styles.cardHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.iconContainer}>
                    <IconComponent />
                  </div>
                  <span style={styles.count}>{item.count}</span>
                </div>
                
                <h3 style={styles.cardTitle}>{item.type}</h3>
                <p style={styles.cardDescription}>{item.description}</p>
                
                <div style={styles.cardFooter}>
                  <span style={styles.cardLink}>Administrar →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen adicional */}
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Resumen del Sistema</h2>
          <div style={styles.summaryGrid}>
            <div style={{ ...styles.summaryItem, backgroundColor: '#f0fdf4' }}>
              <div style={{ ...styles.summaryNumber, color: '#059669' }}>98%</div>
              <div style={styles.summaryLabel}>Uptime del Sistema</div>
            </div>
            <div style={{ ...styles.summaryItem, backgroundColor: '#eff6ff' }}>
              <div style={{ ...styles.summaryNumber, color: '#2563eb' }}>
                {adminItems.reduce((acc, item) => acc + item.count, 0)}
              </div>
              <div style={styles.summaryLabel}>Total de Elementos</div>
            </div>
            <div style={{ ...styles.summaryItem, backgroundColor: '#faf5ff' }}>
              <div style={{ ...styles.summaryNumber, color: '#7c3aed' }}>24/7</div>
              <div style={styles.summaryLabel}>Soporte Disponible</div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de error */}
      {showErrorModal && <ErrorModal />}
    </div>
  );
};

export default AdminLandingPage;