import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/ActividadesSocio.css";

export default function EnrolledActivities() {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEnrolledActivities() {
      if (!user || !user.email) {
        setActivities([]);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3001/api/usuario-actividades/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching enrolled activities");
        }
        const data = await response.json();
        setActivities(data.actividades);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEnrolledActivities();
  }, [user]);

  if (loading) return <p>Cargando actividades inscriptas...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleUnsubscribe = async (actividadId) => {
    const confirm = window.confirm(
      "¿Estás seguro que deseas darte de baja de esta actividad?"
    );
    if (!confirm) return;

    try {
      const response = await fetch("http://localhost:3001/api/dar-de-baja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, actividadId }),
      });
      if (!response.ok) {
        let errorMessage = "Error al dar de baja";
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }
      alert("Baja de actividad exitosa.");
      // Refresh activities list
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/api/usuario-actividades/${user.email}`
      );
      if (!res.ok) {
        throw new Error("Error al actualizar actividades");
      }
      const data = await res.json();
      setActivities(data.actividades);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (activities.length === 0) {
    return (
      <div>
        <p>No estás inscripto en ninguna actividad.</p>
        <Link to="/actividades">Ir a actividades disponibles</Link>
      </div>
    );
  }

  return (
    <section className="actividades-section">
      <h2>Mis Actividades</h2>

      {activities.length === 0 ? (
        <p>No estás inscripto en ninguna actividad todavía.</p>
      ) : (
        <div className="actividades-grid">
          {activities.map((act) => (
            <div key={act.id} className="actividad-card">
              <h3>{act.nombre}</h3>
              <p>
                <strong>DIa:</strong> {act.dia}
              </p>
              <p>
                <strong>Horario:</strong> {act.horario}
              </p>
              <p>
                <strong>Entrenador:</strong> {act.entrenador}
              </p>
              <button
                className="desinscribirse"
                onClick={() => handleUnsubscribe(act.id)}
              >
                Desuscribirse
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
