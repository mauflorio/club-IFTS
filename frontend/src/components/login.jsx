import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (res.ok) {
          login(data.user); // Guarda al usuario en contexto
          navigate('/perfil'); // Redirige al perfil
        } else {
          alert(data.error || 'Credenciales inválidas');
        }
      } catch {
        console.error('Invalid JSON response:', text);
        alert('Error inesperado del servidor');
      }
    } catch (error) {
      alert('Error de conexión al servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="Correo electrónico"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        placeholder="Contraseña"
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}
