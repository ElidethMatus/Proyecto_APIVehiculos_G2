const express = require('express');
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
// Aqui llamamos a las rutas de clientes , ventas y precioUsd , y les aplicamos el middleware de autenticacion para que solo los usuarios autenticados puedan acceder a estas rutas.
const clientesRoute = require('./routes/clientesRoute');
const ventasRoute = require('./routes/ventasRoute');
const precioUsdRoute = require('./routes/precioUsdRoute');
// Aqui se aplican las rutas y el middleware de autenticacion para cada una de ellas.
app.use('/clientes', AuthMiddleware, clientesRoute);
app.use('/ventas', AuthMiddleware, ventasRoute);
app.use('/precio-usd', AuthMiddleware, precioUsdRoute);

app.listen(PORT,()=>{
  console.log(`El servidor esta escuchando en en http://localhost:${PORT}`);
});