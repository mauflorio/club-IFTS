import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const ResetearContraseña = () => {
  const [token, setToken] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [modal, setModal] = useState({ open: false, type: "", message: "" });
  const navigate = useNavigate();

  const closeModal = () => {
    if (modal.type === "success") {
      setModal({ open: false, type: "", message: "" });
      navigate("/login");
    } else {
      setModal({ open: false, type: "", message: "" });
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/reset-password", {
        token,
        nuevaPassword,
      });
      setModal({
        open: true,
        type: "success",
        message: "Contraseña actualizada correctamente",
      });
    } catch (error) {
      setModal({
        open: true,
        type: "error",
        message: "Error al actualizar la contraseña",
      });
      console.error(error);
    }
  };

  return (
    <section className="login-section">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleReset} noValidate>
        <div className="field-group">
          <label>Token:</label>
          <input
            type="text"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <div className="field-group">
          <label>Nueva contraseña:</label>
          <input
            key="password"
            type="password"
            required
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
          />
        </div>
        <div className="field-group">
          <label>Repetir contraseña:</label>
          <input key="confirmPassword" type="password" required />
        </div>

        <button style={{ marginTop: '1rem' }} type="submit">Actualizar Contraseña</button>
      </form>

      {modal.open && (
        <div className={`modal ${modal.type}`}>
          <p>{modal.message}</p>
          <button onClick={closeModal}>Cerrar</button>
        </div>
      )}
    </section>
  );
};

export default ResetearContraseña;
