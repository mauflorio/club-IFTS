const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./club.db", (err) => {
  if (err) return console.error("Error al conectar a la DB", err.message);
  console.log("Conectado a la base de datos SQLite");
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      email TEXT PRIMARY KEY,
      nombre TEXT,
      apellido TEXT,
      dni TEXT,
      direccion TEXT,
      telefono TEXT,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS actividades (
      id INTEGER PRIMARY KEY,
      nombre TEXT,
      dia TEXT,
      horario TEXT,
      entrenador TEXT,
      requisitos TEXT,
      cupo INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS inscripciones (
      email TEXT,
      actividad_id INTEGER,
      PRIMARY KEY (email, actividad_id),
      FOREIGN KEY (email) REFERENCES usuarios(email),
      FOREIGN KEY (actividad_id) REFERENCES actividades(id)
    )
  `);
});

module.exports = db;
