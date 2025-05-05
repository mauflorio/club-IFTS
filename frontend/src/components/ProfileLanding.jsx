import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileLanding() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <p>Cargando...</p>; // o redirigir

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const esAdmin = user.rol === 'admin'; // CA04

  return (
    <div className="perfil-container">
      <h2>Bienvenido/a, {user.nombre} 👋</h2> {/* CA05 */}

      <section className="datos-personales"> {/* CA02 */}
        <h3>Datos Personales</h3>
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Apellido:</strong> {user.apellido}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
      </section>

      <section className="accesos"> {/* CA03 */}
        <h3>Accesos directos</h3>
        <ul>
          <li><button onClick={() => navigate('/actividades/inscriptas')}>Actividades inscriptas</button></li>
          <li><button onClick={() => navigate('/actividades')}>Actividades disponibles</button></li>
          <li><button onClick={() => navigate('/cuenta')}>Estado de cuenta</button></li>
          <li><button onClick={() => navigate('/editar-perfil')}>Editar perfil</button></li>
          {esAdmin && <li><button onClick={() => navigate('/admin')}>Administración</button></li>}
          <li><button onClick={handleLogout}>Cerrar sesión</button></li>
        </ul>
      </section>
    </div>
  );
}
