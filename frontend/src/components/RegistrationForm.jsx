// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom'; // Si usas react-router-dom

export default function RegistrationForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ open: false, type: '', message: '' });
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.nombre.trim())
      errs.nombre = 'El campo Nombre es obligatorio.';
    if (!form.apellido.trim())
      errs.apellido = 'El campo Apellido es obligatorio.';
    if (!form.dni.trim())
      errs.dni = 'El campo DNI es obligatorio.';
    else if (!/^\d+$/.test(form.dni))
      errs.dni = 'DNI debe contener solo números.';
    if (!form.direccion.trim())
      errs.direccion = 'El campo Dirección es obligatorio.';
    if (!form.email.trim())
      errs.email = 'El campo Correo electrónico es obligatorio.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.email = 'Correo electrónico con formato inválido.';
    if (!form.telefono.trim())
      errs.telefono = 'El campo Teléfono es obligatorio.';
    else if (!/^\+?[0-9]{7,15}$/.test(form.telefono))
      errs.telefono = 'Teléfono con formato inválido.';
    if (!form.password)
      errs.password = 'Debe ingresar una contraseña.';
    if (!form.confirmPassword)
      errs.confirmPassword = 'Debe confirmar la contraseña.';
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Las contraseñas ingresadas no coinciden. Vuelva a intentarlo.';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setModal({
        open: true,
        type: 'error',
        message: 'Ha habido un error. Revise el formulario'
      });
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setModal({
          open: true,
          type: 'success',
          message: 'Registración exitosa'
        });
        setTimeout(() => {
          navigate('/home'); // Redirecciona después de éxito
        }, 2000);
      } else {
        setModal({
          open: true,
          type: 'error',
          message: data.error || 'Error en el registro'
        });
      }
    } catch {
      setModal({
        open: true,
        type: 'error',
        message: 'Error de conexión al servidor'
      });
    }
  };

  const closeModal = () => {
    setModal({ open: false, type: '', message: '' });
  };

  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { key: 'nombre', label: 'Nombre', type: 'text' },
          { key: 'apellido', label: 'Apellido', type: 'text' },
          { key: 'dni', label: 'DNI', type: 'text' },
          { key: 'direccion', label: 'Dirección', type: 'text' },
          { key: 'email', label: 'Correo electrónico', type: 'email' },
          { key: 'telefono', label: 'Teléfono', type: 'text' },
          { key: 'password', label: 'Contraseña', type: 'password' },
          { key: 'confirmPassword', label: 'Confirmar contraseña', type: 'password' }
        ].map(({ key, label, type }) => (
          <div key={key} className="field-group">
            <label htmlFor={key}>{label}</label>
            <input
              id={key}
              name={key}
              type={type}
              value={form[key]}
              onChange={handleChange}
            />
            {errors[key] && <span className="error">{errors[key]}</span>}
          </div>
        ))}
        <button type="submit">Registrarse</button>
      </form>

      {/* Modal */}
      {modal.open && (
        <div className={`modal ${modal.type}`}>
          <p>{modal.message}</p>
          <button onClick={closeModal}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
