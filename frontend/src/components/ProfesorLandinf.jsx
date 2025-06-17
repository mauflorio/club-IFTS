import React, { useEffect, useState } from 'react';
import '../styles/ProfesorLanding.css';

const ProfesorLanding = () => {
  const perfilInicial = {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'profesor@club.com',
    especialidad: 'Educación Física',
    telefono: '+54 9 11 5555 0000',
    dni: '30123123'
  };

  const [perfil, setPerfil] = useState(perfilInicial);
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const guardado = localStorage.getItem('perfilProfesor');
    if (guardado) {
      setPerfil(JSON.parse(guardado));
    }
  }, []);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const validarPerfil = () => {
    if (!perfil.nombre || !perfil.apellido || !perfil.email || !perfil.telefono || !perfil.especialidad || !perfil.dni) {
      setError('Todos los campos deben completarse.');
      return false;
    }

    const correoValido = /\S+@\S+\.\S+/.test(perfil.email);
    if (!correoValido) {
      setError('El correo electrónico no es válido.');
      return false;
    }

    return true;
  };

  const guardarCambios = () => {
    if (!validarPerfil()) return;

    try {
      localStorage.setItem('perfilProfesor', JSON.stringify(perfil));
      setMensaje('Perfil actualizado correctamente.');
      setError('');
      setEditando(false);
    } catch (e) {
      setError('No se pudieron guardar los cambios. Inténtalo nuevamente.');
    }
  };

  return (
    <section className="profesor-landing">
      <h1>Bienvenido, Profesor</h1>
      <div className="profesor-accesos">
        <ul>
          <li><a href="/programar-clase">Programar eventos/clases</a></li>
          <li><a href="/mis-clases">Mis clases</a></li>
        </ul>
      </div>

      <div className="profesor-perfil">
        <h2>Mi Perfil</h2>

        {mensaje && <div className="profesor-alert-success">{mensaje}</div>}
        {error && <div className="profesor-alert-error">{error}</div>}

        {!editando ? (
          <div className="profesor-card">
          <h3>{perfil.nombre} {perfil.apellido}</h3>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Especialidad:</strong> {perfil.especialidad}</p>
          <p><strong>Teléfono:</strong> {perfil.telefono}</p>
          <p><strong>DNI:</strong> {perfil.dni}</p>
          <button style={{ marginTop: "1rem" }} className="profesor-btn" onClick={() => setEditando(true)}>Editar Perfil</button>
        </div>
        
        ) : (
          <form className="profesor-form" onSubmit={(e) => e.preventDefault()}>
            <label>Nombre: <input name="nombre" value={perfil.nombre} onChange={handleChange} /></label>
            <label>Apellido: <input name="apellido" value={perfil.apellido} onChange={handleChange} /></label>
            <label>Email: <input name="email" value={perfil.email} onChange={handleChange} /></label>
            <label>Especialidad: <input name="especialidad" value={perfil.especialidad} onChange={handleChange} /></label>
            <label>Teléfono: <input name="telefono" value={perfil.telefono} onChange={handleChange} /></label>
            <label>DNI: <input name="dni" value={perfil.dni} onChange={handleChange} /></label>
            <div>
              <button className="profesor-btn" onClick={guardarCambios}>Guardar Cambios</button>
              <button type="button" className="profesor-btn cancelar" onClick={() => setEditando(false)}>Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ProfesorLanding;
