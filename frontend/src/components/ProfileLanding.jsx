import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    <div className="perfil-container">
      <h2>Bienvenido/a, {user.nombre} 👋</h2> {/* CA05 */}
      <section className="datos-personales">
        {" "}
        {/* CA02 */}
        <h3>Datos Personales</h3>
        {!isEditing ? (
          <>
            <p>
              <strong>Nombre:</strong> {user.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {user.apellido}
            </p>
            <p>
              <strong>DNI:</strong> {user.dni}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.telefono}
            </p>
            <p>
              <strong>Rol:</strong> {user.rol}
            </p>
            <button onClick={() => setIsEditing(true)}>EDITAR</button>
          </>
        ) : (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label>
                  Nombre: </label>
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
               
              </div>
              <div className="field-group">
                <label>
                  Apellido: </label>
                  <input
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
               
              </div>
              <div className="field-group">
                <label>
                  DNI:</label>
                  <input
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                  />
                
              </div>

              <div className="field-group">
                <label>
                  Dirección:</label>
                  <input
                    name="direccion"
                    value={formData.direccion || ""}
                    onChange={handleChange}
                  />
                
              </div>

              <div className="field-group">
                <label>
                  Teléfono:</label>
                  <input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                
              </div>

              <div className="field-group">
                <label>
                  Email:</label>
                  <input name="email" value={formData.email} disabled />
                
              </div>

              <div className="field-group">
                <label>
                  Password:  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password || ""}
                    readOnly
                    disabled
                  />
               
              </div>

              <button type="submit">Confirmar cambios</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </form>
          </div>
        )}
      </section>
      <section className="accesos">
        {" "}
        {/* CA03 */}
        <h3>Accesos directos</h3>
        <ul>
          <li>
            <button onClick={() => navigate("/actividades/inscriptas")}>
              Actividades inscriptas
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/actividades")}>
              Actividades disponibles
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/cuenta")}>
              Estado de cuenta
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/editar-perfil")}>
              Editar perfil
            </button>
          </li>
          {esAdmin && (
            <li>
              <button onClick={() => navigate("/admin")}>Administración</button>
            </li>
          )}
          <li>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </li>
        </ul>
      </section>
    </div>
  );
}
