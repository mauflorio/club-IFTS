import React, { useState } from 'react';
import '../styles/ProgramarClase.css';

const ProgramarClase = () => {
  const [form, setForm] = useState({
    fecha: '',
    hora: '',
    lugar: '',
    descripcion: '',
    cupo: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevasClases = JSON.parse(localStorage.getItem('clasesProfesor')) || [];
    nuevasClases.push(form);
    localStorage.setItem('clasesProfesor', JSON.stringify(nuevasClases));

    setMensaje('Clase programada con éxito.');
    setForm({ fecha: '', hora: '', lugar: '', descripcion: '', cupo: '' });

    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <section className="programar-section">
      <h2>Programar Nueva Clase</h2>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      <form className="programar-form" onSubmit={handleSubmit}>
        <label>Fecha:
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        </label>
        <label>Hora:
          <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
        </label>
        <label>Lugar:
          <input type="text" name="lugar" value={form.lugar} onChange={handleChange} required />
        </label>
        <label>Descripción:
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />
        </label>
        <label>Cupo máximo:
          <input type="number" name="cupo" value={form.cupo} onChange={handleChange} required />
        </label>

        <button type="submit">Guardar Clase</button>
      </form>
    </section>
  );
};

export default ProgramarClase;
