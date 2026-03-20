const express = require('express');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const pool = require('./config/db');
const AuthMiddleware = require('./middleware/authMiddleware');


const authRoute = require('./routes/authRoute');
const usuariosRoutes = require('./routes/usuariosRoutes');
const vehiculosRoutes = require('./routes/vehiculosRoutes');

app.use('/api/auth', authRoute);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/vehiculos', vehiculosRoutes);

app.get('/', (req, res) => {
    res.send('La API está escuchando');
});



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
=======
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const pool = require('./config/db');// Aqui llamamos lo que exportamos por medio de module.esports , nuestro pool de conexion
const AuthMiddleware = require('./middleware/authMiddleware');

app.use(express.json());
//Se utiliza para poder utilizar el archivo .env 
//En el archivo .env guardo los valores de mi conexion a base de datos , como nombre , contrase;a , usuario y host
require('dotenv').config();
const authRoute = require('./routes/authRoute');
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/',authRoute);
app.use('/',usuariosRoutes);

const PORT =process.env.PORT;
const SECRET_KEY = process.env.JWT_SECRET_KEY;

app.listen(PORT,()=>{
  console.log(`El servidor esta escuchando en en http://localhost:${PORT}`);
>>>>>>> origin/develop
});