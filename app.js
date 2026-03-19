const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const otroNombre = require('./config/db');
const AuthMiddleware = require('./middleware/authMiddleware');
const authRoute = require('./routes/authRoute');
const vehiculosRoutes = require('./routes/vehiculosRoutes');

app.use('/api/auth', authRoute);

app.use('/api/vehiculos', vehiculosRoutes);


app.get('/', (req, res) => {
    res.send('La API está escuchando');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});