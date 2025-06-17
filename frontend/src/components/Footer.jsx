import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Club Deportivo. Todos los derechos reservados.</p>
        <p className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <span> | </span>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <span> | </span>
          <a href="mailto:contacto@club.com">Contacto</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
