import logo from "../assets/logo.png";
import "../styles/Header.css";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  //const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="Club Logo" />
          <span>Club Deportivo</span>
        </div>
        <nav className="header-nav">
          {!user ? (
            <>
              {" "}
              <a href="/home">Inicio</a>
              <a href="/registro">Registro</a>
              <a href="/login">Login</a>
            </>
          ) : (
            <>
              <a href="/home">Inicio</a>
              <a href="/perfil">Perfil</a>
              <button className="header-logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>

     
    </header>
  );
};

export default Header;
