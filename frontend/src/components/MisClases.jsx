import React, { useEffect, useState } from 'react';
import '../styles/MisClases.css';

const MisClases = () => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('clasesProfesor');
    if (data) {
      setClases(JSON.parse(data));
    }
  }, []);

  return (
    <section className="misclases-section">
      <h2>Mis Clases Programadas</h2>

      {clases.length === 0 ? (
        <p>No hay clases programadas todavía.</p>
      ) : (
        <div className="misclases-listado">
          {clases.map((clase, index) => (
            <div key={index} className="clase-card">
              <h3>{clase.descripcion}</h3>
              <p><strong>Fecha:</strong> {clase.fecha}</p>
              <p><strong>Hora:</strong> {clase.hora}</p>
              <p><strong>Lugar:</strong> {clase.lugar}</p>
              <p><strong>Cupo máximo:</strong> {clase.cupo}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MisClases;
