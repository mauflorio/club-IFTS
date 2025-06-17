import React, { useEffect, useState } from 'react';
import '../styles/AdminPerfil.css';

const perfilPorDefecto = {
  nombre: 'Admin General',
  email: 'admin@club.com',
  rol: 'Administrador'
};

const AdminPerfil = () => {
  const [perfil, setPerfil] = useState(perfilPorDefecto);
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const guardado = localStorage.getItem('perfilAdmin');
    if (guardado) setPerfil(JSON.parse(guardado));
  }, []);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!perfil.nombre || !perfil.email) {
      setError('Todos los campos deben completarse.');
      return false;
    }

    const esEmail = /\S+@\S+\.\S+/.test(perfil.email);
    if (!esEmail) {
      setError('El correo electrónico no es válido.');
      return false;
    }

    return true;
  };

  const guardar = () => {
    if (!validar()) return;

    try {
      localStorage.setItem('perfilAdmin', JSON.stringify(perfil));
      setMensaje('Perfil actualizado correctamente.');
      setError('');
      setEditando(false);
    } catch {
      setError('No se pudieron guardar los cambios. Inténtalo nuevamente.');
    }
  };

  return (
    <section className="admin-perfil-section">
      <h2>Mi Perfil de Administrador</h2>

      {mensaje && <div className="alert-success">{mensaje}</div>}
      {error && <div className="alert-error">{error}</div>}

      {!editando ? (
        <div className="perfil-card-container">
        <div className="perfil-card">
          <h3>Nombre</h3>
          <p>{perfil.nombre}</p>
        </div>
        <div className="perfil-card">
          <h3>Email</h3>
          <p>{perfil.email}</p>
        </div>
        <div className="perfil-card">
          <h3>Rol</h3>
          <p>{perfil.rol}</p>
        </div>
      </div>
      
      ) : (
        <form className="admin-perfil-form" onSubmit={(e) => e.preventDefault()}>
          <label>Nombre:
            <input name="nombre" value={perfil.nombre} onChange={handleChange} />
          </label>
          <label>Email:
            <input name="email" value={perfil.email} onChange={handleChange} />
          </label>
          <label>Rol:
            <input value={perfil.rol} disabled />
          </label>
          <div>
            <button className="btn" onClick={guardar}>Guardar</button>
            <button className="btn cancelar" onClick={() => setEditando(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AdminPerfil;
