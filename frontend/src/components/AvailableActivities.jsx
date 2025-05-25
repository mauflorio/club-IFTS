import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AvailableActivities() {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [buttonLoading, setButtonLoading] = useState({}); // track loading state per activity

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('http://localhost:3001/api/actividades');
        if (!response.ok) {
          throw new Error('Error fetching activities');
        }
        const data = await response.json();
        // Filter activities with available spots
        const availableActivities = data.actividades.filter(
          (act) => act.cupo > act.inscriptos.length
        );
        setActivities(availableActivities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  const handleInscripcion = async (actividadId) => {
    if (!user || !user.email) {
      setMessage('Debe iniciar sesión para inscribirse.');
      return;
    }
    setMessage(null);
    setButtonLoading((prev) => ({ ...prev, [actividadId]: true }));
    try {
      const response = await fetch('http://localhost:3001/api/inscribirse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, actividadId }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || 'Error en la inscripción.');
      } else {
        setMessage(data.message || 'Inscripción exitosa.');
        // Update activities state to reflect new inscriptos count
        setActivities((prevActivities) =>
          prevActivities.map((act) =>
            act.id === actividadId
              ? { ...act, inscriptos: [...act.inscriptos, user.email] }
              : act
          )
        );
      }
    } catch (err) {
      setMessage('Error en la inscripción.');
    } finally {
      setButtonLoading((prev) => ({ ...prev, [actividadId]: false }));
    }
  };

  if (loading) return <p>Cargando actividades...</p>;
  if (error) return <p>Error: {error}</p>;

  if (activities.length === 0) {
    return <p>No hay actividades disponibles con cupo.</p>;
  }

  return (
    <div>
      <h2>Actividades Disponibles</h2>
      {message && <p>{message}</p>}
      <ul>
        {activities.map((act) => {
          const isInscripto = act.inscriptos.includes(user?.email);
          const cuposDisponibles = act.cupo - act.inscriptos.length;
          return (
            <li key={act.id} style={{ marginBottom: '1rem' }}>
              <h3>{act.nombre}</h3>
              <p><strong>Día:</strong> {act.dia}</p>
              <p><strong>Horario:</strong> {act.horario}</p>
              <p><strong>Entrenador:</strong> {act.entrenador}</p>
              <p><strong>Requisitos:</strong> {act.requisitos}</p>
              <p><strong>Cupo:</strong> {act.cupo}</p>
              <p><strong>Inscriptos:</strong> {act.inscriptos.length}</p>
              <p><strong>Cupos disponibles:</strong> {cuposDisponibles}</p>
              <button
                onClick={() => handleInscripcion(act.id)}
                disabled={isInscripto || cuposDisponibles <= 0 || buttonLoading[act.id]}
              >
                {buttonLoading[act.id] ? 'Inscribiendo...' : isInscripto ? 'Ya Inscripto' : 'Inscripción'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
