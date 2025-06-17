import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/SocioLanding.css";

export default function ProfileLanding() {
  const { user, logout, authUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  //Editar datos de Perfil excluyendo la contraseña y el email tampoco por que es lo que toma como id del usuario

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/usuario/${encodeURIComponent(formData.email)}`,
        formData
      );
      await authUser();
      alert("Datos actualizados correctamente");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al actualizar los datos");
    }
  };

  if (!user) return <p>Cargando...</p>; // o redirigir

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const esAdmin = user.rol === "admin"; // CA04

  return (
    <section className="socio-section">
      <h1 className="socio-title">Mi Perfil</h1>
      <h2>Bienvenido/a, {user.nombre} 👋</h2> {/* CA05 */}
      <div className="socio-dashboard">
        <div className="socio-card">
          <h3>Actividades</h3>
          <p>2 inscripciones</p>
        </div>
        <div className="socio-card">
          <h3>Asistencias</h3>
          <p>8 de 10 entrenamientos</p>
        </div>
        <div className="socio-card">
          <h3>Estado de cuota</h3>
          <p>Al día</p>
        </div>
      </div>
      <div className="socio-datos-btn">
        <button
          className="socio-btn secundario"
          onClick={() => navigate("/actividades")}
        >
          Ver Actividades Disponibles
        </button>
        <button
          className="socio-btn secundario"
          onClick={() => navigate("/actividades/inscriptas")}
        >
          Actividades inscriptas
        </button>
      </div>
      <section className="datos-personales">
        {" "}
        {/* CA02 */}
        <h3>Datos Personales</h3>
        {!isEditing ? (
          <>
            <div className="socio-datos-grid">
              <div className="socio-dato">
                <span>👤</span>
                <strong>Nombre:</strong> {user.nombre} {user.apellido}
              </div>
              <div className="socio-dato">
                <span>🔢</span>
                <strong>N° Socio:</strong> {user.nroSocio}
              </div>
              <div className="socio-dato">
                <span>🪪</span>
                <strong>DNI:</strong> {user.dni}
              </div>
              <div className="socio-dato">
                <span>🎂</span>
                <strong>Nacimiento:</strong> {user.nacimiento}
              </div>
              <div className="socio-dato">
                <span>📍</span>
                <strong>Dirección:</strong> {user.direccion}
              </div>
              <div className="socio-dato">
                <span>📞</span>
                <strong>Teléfono:</strong> {user.telefono}
              </div>
              <div className="socio-dato">
                <span>📧</span>
                <strong>Email:</strong> {user.email}
              </div>
              <div className="socio-dato">
                <span>💳</span>
                <strong>Cuota:</strong>
                <span>Al dia</span>
              </div>
              <div className="socio-datos-btn">
                <button
                  className="socio-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </>
        ) : (
          <form className="socio-form" onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Apellido:</label>
              <input
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>DNI:</label>
              <input name="dni" value={formData.dni} onChange={handleChange} />
            </div>

            <div>
              <label>Dirección:</label>
              <input
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Correo Electrónico:</label>
              <input
                name="correo"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                name="password"
                type="password"
                value={formData.password || ""}
                readOnly
                disabled
              />
            </div>
            <div>
              <button  className="socio-btn" type="submit">
                Guardar Cambios
              </button>
              <button
                className="socio-btn cancelar"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </section>
      <section className="accesos">
        <ul>
          {esAdmin && (
            <li>
              <button onClick={() => navigate("/admin")}>Administración</button>
            </li>
          )}
        
        </ul>
      </section>
    </section>
  );
}
