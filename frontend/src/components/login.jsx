import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "admin@club.com") {
      navigate("/admin");
    } else if (email === "profesor@club.com") {
      navigate("/profesor");
    } else {
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
    }
  };

  return (
    <section className="login-section">
      <h2 className="login-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        <button style={{ marginTop: "1rem" }} type="submit">
          Ingresar
        </button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <a href="/recuperar">Recuperar Contraseña</a>
      </div>
    </section>
  );
}
