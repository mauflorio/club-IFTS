const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    nombre: "Juan",
    apellido: "Pérez",
    dni: "12345678",
    direccion: "Calle Falsa 123",
    email: "juan@example.com",
    telefono: "1112345678",
    password: "123456",
    actividades: [],
  },
  {
    nombre: "María",
    apellido: "Gómez",
    dni: "23456789",
    direccion: "Av. Siempre Viva 742",
    email: "maria@example.com",
    telefono: "1123456789",
    password: "abcdef",
    actividades: [],
  },
  {
    nombre: "Carlos",
    apellido: "Rodríguez",
    dni: "34567890",
    direccion: "San Martín 456",
    email: "carlos@example.com",
    telefono: "1134567890",
    password: "pass123",
    actividades: [3],
  },
  {
    nombre: "Matias",
    apellido: "Parentti",
    dni: "39273059",
    direccion: "Av. Mitre 123",
    email: "matiparentti@gmail.com",
    telefono: "1111111111",
    password: "test123",
    actividades: [1],
  },
  {
    nombre: "Iñaki",
    apellido: "Zarate",
    dni: "43360207",
    direccion: "Calle 9 N° 456",
    email: "inakizarate25@gmail.com",
    telefono: "2222222222",
    password: "test123",
    actividades: [2],
  },
  {
    nombre: "Mauro",
    apellido: "Florio Aguilar",
    dni: "36164599",
    direccion: "Av. Córdoba 789",
    email: "mau.florio@gmail.com",
    telefono: "3333333333",
    password: "test123",
    actividades: [1,3],
  },
  {
    nombre: "Nicolas Sebastian",
    apellido: "Mafone",
    dni: "29544646",
    direccion: "Belgrano 321",
    email: "nicolasmafone@gmail.com",
    telefono: "4444444444",
    password: "test123",
    actividades: [
      3
    ],
  },
];
const actividades = [
  {
    id: 1,
    nombre: "Fútbol",
    dia: "Lunes y Viernes",
    horario: "18:00 - 20:00",
    entrenador: "Marcelo Gallardo",
    requisitos: "Botines y apto médico",
    cupo: 10,
    inscriptos: ["matiparentti@gmail.com", "mau.florio@gmail.com"],
  },
  {
    id: 2,
    nombre: "Rugby",
    dia: "Martes y Sabados",
    horario: "10:00 - 12:00",
    entrenador: "Juan Perez",
    requisitos: "apto médico",
    cupo: 10,
    inscriptos: ["inakizarate25@gmail.com"],
  },
  {
    id: 3,
    nombre: "Natacion",
    dia: "Miercoles",
    horario: "10:00 - 12:00",
    entrenador: "Lebron James",
    requisitos: "apto médico , traje de baño",
    cupo: 3,
    inscriptos: [
      "nicolasmafone@gmail.com",
      "mau.florio@gmail.com",
      "carlos@example.com",
    ],
  },
];

app.post("/api/register", (req, res) => {
  const {
    nombre,
    apellido,
    dni,
    direccion,
    email,
    telefono,
    password,
    confirmPassword,
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !dni ||
    !direccion ||
    !email ||
    !telefono ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Las contraseñas no coinciden." });
  }

  if (!/^\d+$/.test(dni))
    return res.status(400).json({ error: "DNI debe ser numérico." });

  users.push({
    nombre,
    apellido,
    dni,
    direccion,
    email,
    telefono,
    password,
    actividades: [],
  });
  return res.status(201).json({ message: "Usuario registrado correctamente." });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ error: "Usuario no encontrado." });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Contraseña incorrecta." });
  }

  const { password: pwd, ...userWithoutPassword } = user;

  return res.json({ user: userWithoutPassword });
});

app.get("/api/usuario/:email", (req, res) => {
  const email = req.params.email;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  const { password, ...userSinPassword } = user;

  res.json({ user: userSinPassword });
});

app.post("/api/inscribirse", (req, res) => {
  const { email, actividadId } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  const actividad = actividades.find((a) => a.id === actividadId);
  if (!actividad) {
    return res.status(404).json({ error: "Actividad no encontrada." });
  }

  const yaInscripto = actividad.inscriptos.includes(email);
  if (yaInscripto) {
    return res
      .status(400)
      .json({ error: "Ya estás inscripto en esta actividad." });
  }

  if (actividad.inscriptos.length >= actividad.cupo) {
    return res.status(400).json({ error: "No hay cupos disponibles." });
  }

  actividad.inscriptos.push(email);
  user.actividades.push(actividadId);

  return res.status(200).json({ message: "Inscripción exitosa." });
});

app.get("/api/actividades", (req, res) => {
  res.json({ actividades });
});

app.get("/api/usuario-actividades/:email", (req, res) => {
  const email = req.params.email;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  const actividadesUsuario = actividades.filter((act) =>
    user.actividades.includes(act.id)
  );

  return res.json({ actividades: actividadesUsuario });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
