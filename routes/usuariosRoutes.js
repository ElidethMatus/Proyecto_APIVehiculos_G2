const express = require('express');
const pool = require('../config/db');

const router = express.Router();

// GET todos los usuarios (SIN password)
router.get('/', (req, res) => {
  const sql = `
    SELECT idUsuarios, Nombre, Apellido, Correo, Rol, Telefono, Estado, Username
    FROM Usuarios
  `;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error en la consulta SQL' });
    }

    res.json({
      status: 200,
      message: 'Success',
      data: results
    });
  });
});

// GET usuario por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT idUsuarios, Nombre, Apellido, Correo, Rol, Telefono, Estado, Username
    FROM Usuarios
    WHERE idUsuarios = ?
  `;

  pool.query(sql, [id], (error, results) => {
    if (error) return res.status(500).json(error);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(results[0]);
  });
});

module.exports = router;