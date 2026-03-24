const express = require('express');
const pool = require('../config/db');
require('dotenv').config();
const router = express.Router(); 

//Api para obtener todos los clientes
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Clientes';

  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ status: 500, message: 'Ocurrio un error en la consulta..' });
    }

    return res.status(200).json({ status: 200, message: 'Success', data: results });
  });
});

// POST /clientes
router.post('/', (req, res) => {
  const { Nombre, Apellido, Correo, Telefono, Direccion, Fecha_Registro } = req.body ?? {};

  if (!Nombre || !Apellido || !Correo || !Telefono || !Fecha_Registro) {
    return res.status(403).json({ status: 403, message: 'Faltan campos requeridos' });
  }

  const sql =
    'INSERT INTO Clientes (Nombre, Apellido, Correo, Telefono, Direccion, Fecha_Registro) VALUES (?, ?, ?, ?, ?, ?)';

  pool.query(
    sql,
    [Nombre, Apellido, Correo, Telefono, Direccion ?? null, Fecha_Registro],
    (error, results) => {
      if (error) {
        return res.status(500).json({ status: 500, message: 'Error el la consulta sql..' });
      }

      const sql2 = 'SELECT * FROM Clientes WHERE idClientes = ?';
      pool.query(sql2, [results.insertId], (error2, results2) => {
        if (error2) {
          return res.status(500).json({ status: 500, message: 'Error el la consulta sql..' });
        }

        return res.status(201).json({ status: 201, message: 'Success', data: results2[0] });
      });
    }
  );
});


// PUT /clientes/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return res.status(403).json({ status: 403, message: 'id inválido' });
  }

  const { Nombre, Apellido, Correo, Telefono, Direccion, Fecha_Registro } = req.body ?? {};

  if (!Nombre || !Apellido || !Correo || !Telefono || !Fecha_Registro) {
    return res.status(403).json({ status: 403, message: 'Faltan campos requeridos' });
  }

  const sql =
    'UPDATE Clientes SET Nombre=?, Apellido=?, Correo=?, Telefono=?, Direccion=?, Fecha_Registro=? WHERE idClientes=?';

  pool.query(
    sql,
    [Nombre, Apellido, Correo, Telefono, Direccion ?? null, Fecha_Registro, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ status: 500, message: 'Error el la consulta sql..' });
      }

      if (!results.affectedRows) {
        return res.status(404).json({ status: 404, message: 'Cliente no encontrado' });
      }

      const sql2 = 'SELECT * FROM Clientes WHERE idClientes = ?';
      pool.query(sql2, [id], (error2, results2) => {
        if (error2) {
          return res.status(500).json({ status: 500, message: 'Error el la consulta sql..' });
        }

        return res.status(200).json({ status: 200, message: 'Success', data: results2[0] });
      });
    }
  );
});

// DELETE /clientes/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return res.status(403).json({ status: 403, message: 'id inválido' });
  }

  const sql = 'DELETE FROM Clientes WHERE idClientes = ?';
  pool.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ status: 500, message: 'Error el la consulta sql..' });
    }

    if (!results.affectedRows) {
      return res.status(404).json({ status: 404, message: 'Cliente no encontrado' });
    }

    return res.status(200).json({ status: 200, message: 'Success' });
  });
});

module.exports = router;
