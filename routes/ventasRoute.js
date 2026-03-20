const express = require('express');
const pool = require('../config/db');
require('dotenv').config();
const router = express.Router();

// GET /ventas
router.get('/', (req, res) => {
  const sql = `SELECT v.*, 
                      c.Nombre AS Cliente_Nombre, c.Apellido AS Cliente_Apellido,
                      u.Nombre AS Usuario_Nombre, u.Apellido AS Usuario_Apellido,
                      ve.Marca AS Vehiculo_Marca, ve.Modelo AS Vehiculo_Modelo
                 FROM Ventas v
                 LEFT JOIN Clientes c ON c.idClientes = v.Clientes_idClientes
                 LEFT JOIN Usuarios u ON u.idUsuarios = v.Usuarios_idUsuarios
                 LEFT JOIN Vehiculos ve ON ve.idVehiculo = v.Vehiculos_idVehiculo
                 ORDER BY v.Fecha_venta DESC`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ status: 500, message: 'Ocurrio un error en la consulta..' });
    }

    return res.status(200).json({ status: 200, message: 'Success', data: results });
  });
});

// POST /ventas

router.post('/', (req, res) => {
  const {
    Fecha_venta,
    Subtotal,
    Impuesto,
    Total,
    Clientes_idClientes,
    Usuarios_idUsuarios,
    Vehiculos_idVehiculo,
  } = req.body ?? {};

  if (
    !Fecha_venta ||
    Subtotal == null ||
    Impuesto == null ||
    Total == null ||
    !Clientes_idClientes ||
    !Usuarios_idUsuarios ||
    !Vehiculos_idVehiculo
  ) {
    return res.status(403).json({ status: 403, message: 'Faltan campos requeridos' });
  }

  const sql = `INSERT INTO Ventas
      (Fecha_venta, Subtotal, Impuesto, Total, Clientes_idClientes, Usuarios_idUsuarios, Vehiculos_idVehiculo)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

  pool.query(
    sql,
    [
      Fecha_venta,
      Subtotal,
      Impuesto,
      Total,
      Clientes_idClientes,
      Usuarios_idUsuarios,
      Vehiculos_idVehiculo,
    ],
    (error, results) => {
      if (error) {
        return res.status(500).json({ status: 500, message: 'Error el la consulta sql..' });
      }

      const sql2 = 'SELECT * FROM Ventas WHERE idVentas = ?';
      pool.query(sql2, [results.insertId], (error2, results2) => {
        if (error2) {
          return res.status(500).json({ status: 500, message: 'Error el la consulta sql..' });
        }

        return res.status(201).json({ status: 201, message: 'Success', data: results2[0] });
      });
    }
  );
});

module.exports = router;

