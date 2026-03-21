const express = require('express');
const app = express();
require('dotenv').config();

// DB
const pool = require('./config/db');

// Middleware
const AuthMiddleware = require('./middleware/authMiddleware');

// Rutas
const authRoute = require('./routes/authRoute');
const usuariosRoutes = require('./routes/usuariosRoutes');
const clientesRoute = require('./routes/clientesRoute');
const ventasRoute = require('./routes/ventasRoute');
const precioUsdRoute = require('./routes/precioUsdRoute');
const vehiculosRoute = require('./routes/vehiculosRoutes');

// Middleware global
app.use(express.json());

// Ruta(s) desprotegidas
app.use('/api/auth', authRoute);

// Rutas protegidas

app.use('/api/usuarios', AuthMiddleware, usuariosRoutes);
app.use('/api/clientes', AuthMiddleware, clientesRoute);
app.use('/api/vehiculos', AuthMiddleware, vehiculosRoute);
app.use('/api/ventas', AuthMiddleware, ventasRoute);
app.use('/api/precio-usd', AuthMiddleware, precioUsdRoute);

app.get('/', (req, res) => {
  res.send('Api funcionando');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

//Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});