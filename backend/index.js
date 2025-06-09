const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;
const db = require("./db");

app.use(cors());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));



app.post("/api/register", (req, res) => {
  const { nombre, apellido, dni, direccion, email, telefono, password, confirmPassword } = req.body;

  if (!nombre || !apellido || !dni || !direccion || !email || !telefono || !password || !confirmPassword) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Las contraseñas no coinciden." });
  }

  db.run(
    `INSERT INTO usuarios (email, nombre, apellido, dni, direccion, telefono, password)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [email, nombre, apellido, dni, direccion, telefono, password],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "El usuario ya existe o error en los datos." });
      }
      res.status(201).json({ message: "Usuario registrado correctamente." });
    }
  );
});


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Usuario no encontrado." });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    res.json({ user });
  });
});


app.get("/api/usuario/:email", (req, res) => {
  const email = req.params.email;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json({ user });
  });
});



app.put("/api/usuario/:email", (req, res) => {
  const { email } = req.params;
  const { nombre, apellido, dni, direccion, telefono, password } = req.body;

  if (!nombre || !apellido || !dni || !direccion || !telefono || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  const sql = `
    UPDATE usuarios
    SET nombre = ?, apellido = ?, dni = ?, direccion = ?, telefono = ?, password = ?
    WHERE email = ?
  `;

  db.run(sql, [nombre, apellido, dni, direccion, telefono, password, email], function (err) {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el usuario." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.json({ message: "Usuario actualizado correctamente." });
  });
});


app.post("/api/inscribirse", (req, res) => {
  const { email, actividadId } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
    if (err || !user) return res.status(404).json({ error: "Usuario no encontrado." });

    db.get("SELECT * FROM actividades WHERE id = ?", [actividadId], (err2, actividad) => {
      if (err2 || !actividad) return res.status(404).json({ error: "Actividad no encontrada." });

      db.all(
        "SELECT COUNT(*) as cantidad FROM inscripciones WHERE actividad_id = ?",
        [actividadId],
        (err3, result) => {
          if (err3) return res.status(500).json({ error: "Error al verificar cupos." });

          const cantidad = result[0].cantidad;

          if (cantidad >= actividad.cupo) {
            return res.status(400).json({ error: "No hay cupos disponibles." });
          }

          db.get(
            "SELECT * FROM inscripciones WHERE email = ? AND actividad_id = ?",
            [email, actividadId],
            (err4, inscripto) => {
              if (inscripto) {
                return res.status(400).json({ error: "Ya estás inscripto en esta actividad." });
              }

              db.run(
                "INSERT INTO inscripciones (email, actividad_id) VALUES (?, ?)",
                [email, actividadId],
                (err5) => {
                  if (err5) return res.status(500).json({ error: "Error al inscribirse." });
                  res.status(200).json({ message: "Inscripción exitosa." });
                }
              );
            }
          );
        }
      );
    });
  });
});


app.get("/api/actividades", (req, res) => {
  db.all("SELECT * FROM actividades", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener actividades." });
    }

    // Para cada actividad, traemos inscriptos
    const actividadesConInscriptos = [];

    let pendientes = rows.length;
    if (pendientes === 0) return res.json({ actividades: [] });

    rows.forEach((actividad) => {
      db.all(
        "SELECT email FROM inscripciones WHERE actividad_id = ?",
        [actividad.id],
        (err2, inscriptos) => {
          if (err2) {
            return res.status(500).json({ error: "Error al obtener inscriptos." });
          }

          actividadesConInscriptos.push({
            ...actividad,
            inscriptos: inscriptos.map((i) => i.email),
          });

          if (--pendientes === 0) {
            res.json({ actividades: actividadesConInscriptos });
          }
        }
      );
    });
  });
});


app.get("/api/usuario-actividades/:email", (req, res) => {
  const email = req.params.email;

  db.all(
    `SELECT a.* FROM actividades a
     JOIN inscripciones i ON i.actividad_id = a.id
     WHERE i.email = ?`,
    [email],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Error al obtener actividades del usuario." });

      res.json({ actividades: rows });
    }
  );
});


app.post("/api/dar-de-baja", (req, res) => {
  const { email, actividadId } = req.body;

  db.run(
    "DELETE FROM inscripciones WHERE email = ? AND actividad_id = ?",
    [email, actividadId],
    function (err) {
      if (err) return res.status(500).json({ error: "Error al dar de baja." });

      if (this.changes === 0) {
        return res.status(404).json({ error: "No se encontró inscripción para eliminar." });
      }

      res.status(200).json({ message: "Baja de actividad exitosa." });
    }
  );
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
