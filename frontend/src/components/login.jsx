import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./RegistrationForm.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (res.ok) {
          login(data.user); // Guarda al usuario en contexto
          navigate("/perfil"); // Redirige al perfil
        } else {
          alert(data.error || "Credenciales inválidas");
        }
      } catch {
        console.error("Invalid JSON response:", text);
        alert("Error inesperado del servidor");
      }
    } catch (error) {
      alert("Error de conexión al servidor");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Correo electrónico"
          />
        </div>
        <div className="field-group">
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Contraseña"
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
         <a href="/recuperar">Recuperar Contraseña</a>
      </div>
    </div>
  );
}
