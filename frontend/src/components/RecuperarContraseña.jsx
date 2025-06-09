import { useState } from "react";
import axios from "axios";
import './RegistrationForm.css';
import { useNavigate } from "react-router-dom";

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState({ open: false, type: "", message: "" });
  const navigate = useNavigate();

  const closeModal = () => {
    if (modal.type === "success") {
      setModal({ open: false, type: "", message: "" });
      navigate("/resetear");
    } else {
      setModal({ open: false, type: "", message: "" });
    }
  };

  const handleSolicitarToken = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/recuperar", { email });
      setModal({
        open: true,
        type: "success",
        message: `Token generado: ${res.data.token}`,
      });
    } catch (error) {
      setModal({
        open: true,
        type: "error",
        message: "Error al solicitar el token",
      });
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSolicitarToken}>
        <div className="field-group">
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Solicitar Token</button>
      </form>

      {modal.open && (
        <div className={`modal ${modal.type}`}>
          <p>{modal.message}</p>
          <button onClick={closeModal}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default RecuperarContraseña;
