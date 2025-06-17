import "./Home.css";
import sponsor1 from "../assets/kynet.png";
import sponsor2 from "../assets/gatorade.png";
import sponsor3 from "../assets/adidas.png";

const Home = () => {
  return (
    <div className="home">
      {/* Banner principal */}
      <section className="home-banner">
        <div className="home-banner-overlay">
          <h1>Bienvenido al Club Deportivo</h1>
          <p>Deporte, comunidad y compromiso desde siempre.</p>
        </div>
      </section>

      {/* Secciones destacadas */}
      <section className="home-secciones">
        <div className="home-card">
          <h3>🎯 Actividades</h3>
          <p>
            Explorá todas las disciplinas y horarios disponibles para socios y
            socias.
          </p>
        </div>
        <div className="home-card">
          <h3>📣 Noticias</h3>
          <p>
            Mantenete al día con los últimos eventos, torneos y novedades del
            club.
          </p>
        </div>
        <div className="home-card">
          <h3>📞 Contacto</h3>
          <p>
            Comunicate con nosotros por WhatsApp, redes o en nuestra sede
            central.
          </p>
        </div>
      </section>

      {/* Actividades */}
      <section className="home-actividades">
        <h2>Disciplinas destacadas</h2>
        <div className="home-grid">
          <div className="actividad">🏉 Rugby</div>
          <div className="actividad">🏊‍♂️ Natación</div>
          <div className="actividad">🧘 Yoga</div>
          <div className="actividad">🏋️‍♀️ Gimnasio</div>
          <div className="actividad">⚽ Fútbol</div>
          <div className="actividad">🥋 Taekwondo</div>
        </div>
      </section>

      {/* Eventos / Testimonios */}
      <section className="home-eventos">
        <h2>Testimonios</h2>
        <blockquote>
          “Gracias al club, encontré un espacio donde entrenar y crecer como
          persona. ¡Increíble comunidad!”
          <span>– Juan, socio desde 2018</span>
        </blockquote>
        <blockquote>
          “El club nos dio la oportunidad de competir y hacer amigos. Excelente
          organización y entrenadores.”
          <span>– Carla, jugadora juvenil</span>
        </blockquote>
      </section>
      {/* Sponsors */}
      <section className="home-sponsors">
        <h2>Apoyan al Club</h2>
        <div className="sponsor-logos">
          <img src={sponsor1} alt="Sponsor 1" />
          <img src={sponsor2} alt="Sponsor 2" />
          <img src={sponsor3} alt="Sponsor 3" />
        </div>
      </section>

      {/* Mapa */}
      <section className="home-mapa">
        <h2>¿Dónde estamos?</h2>
        <div className="mapa-container">
          <iframe
            title="Ubicación del Club"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.868188845491!2d-58.447674!3d-34.610869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb4e87c64b6f%3A0x58b0c5b442fa7526!2sParque%20Centenario!5e0!3m2!1ses-419!2sar!4v1683045936901!5m2!1ses-419!2sar"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="home-faq">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-item">
          <strong>¿Cómo me hago socio?</strong>
          <p>Podés registrarte desde la web o acercarte al club con tu DNI.</p>
        </div>
        <div className="faq-item">
          <strong>¿Qué actividades están disponibles?</strong>
          <p>
            Contamos con más de 15 disciplinas incluyendo fútbol, rugby,
            natación, yoga, gimnasio y más.
          </p>
        </div>
        <div className="faq-item">
          <strong>¿Cuáles son los medios de pago?</strong>
          <p>Aceptamos tarjetas, transferencias y pagos en efectivo en sede.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
