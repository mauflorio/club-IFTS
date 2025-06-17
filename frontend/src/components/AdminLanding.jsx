import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLanding.css";

const AdminLanding = () => {
  const navigate = useNavigate();
  const [socios, setSocios] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const datosMock = [
        {
          nombre: "Juan Pérez",
          categoria: "Premium",
          actividades: ["Rugby", "Gimnasio"],
          costo: "$8.000",
          estado: "Activo",
        },
        {
          nombre: "María Gómez",
          categoria: "Básica",
          actividades: ["Yoga"],
          costo: "$4.000",
          estado: "Inactivo",
        },
      ];
      setSocios(datosMock);
    } catch (e) {
      setError(true);
    }
  }, []);

  const manejarCerrarError = () => {
    setError(false);
    navigate("/home");
  };
  return (
    <section className="admin-section">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <div>
          <button onClick={() => navigate("/admin/perfil")}>👤 Perfil</button>
        </div>
      </header>

      {error ? (
        <div className="admin-error">
          <p>Ocurrió un problema. Intente nuevamente más tarde.</p>
          <button onClick={manejarCerrarError}>Aceptar</button>
        </div>
      ) : (
        <>
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Actividades</th>
                <th>Costo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {socios.map((socio, index) => (
                <tr key={index}>
                  <td>{socio.nombre}</td>
                  <td>{socio.categoria}</td>
                  <td>{socio.actividades.join(", ")}</td>
                  <td>{socio.costo}</td>
                  <td className={socio.estado === "Activo" ? "verde" : "rojo"}>
                    {socio.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default AdminLanding;
