const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const users = [];

app.post('/api/register', (req, res) => {
  const { nombre, apellido, dni, direccion, email, telefono, password, confirmPassword } = req.body;

  if (!nombre || !apellido || !dni || !direccion || !email || !telefono || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
  }

  if (!/^\d+$/.test(dni)) return res.status(400).json({ error: 'DNI debe ser numérico.' });

  users.push({ nombre, apellido, dni, direccion, email, telefono, password });
  return res.status(201).json({ message: 'Usuario registrado correctamente.' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ error: 'Usuario no encontrado.' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Contraseña incorrecta.' });
  }

  const { password: pwd, ...userWithoutPassword } = user;

  return res.json({ user: userWithoutPassword });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
