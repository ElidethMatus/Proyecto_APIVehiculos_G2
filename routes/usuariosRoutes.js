const express = require('express');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const router = express.Router();

// GET todos los usuarios sin password
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

  const sql = `SELECT idUsuarios, Nombre, Apellido, Correo, Rol, Telefono, Estado, Username FROM Usuarios WHERE idUsuarios = ?`;
  pool.query(sql, [id], (error, results) => {
    if (error) return res.status(500).json(error);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(results[0]);
  });
});

router.post('/crear', (req, res) => {
  const { Nombre, Apellido, Correo, Password, Rol, Telefono, Estado, Username } = req.body;

  const sql = `
    INSERT INTO Usuarios (Nombre, Apellido, Correo, Password, Rol, Telefono, Estado, Username)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(sql, [Nombre, Apellido, Correo, Password, Rol, Telefono, Estado, Username], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al crear usuario' });
    }

    res.json({ message: 'Usuario creado correctamente' });
  });
});

//API Put 
router.put('/:id', async (req, res) => {

    const id = req.params.id;
    const usuario = req.body;

    if (!usuario.nombre || !usuario.apellido || !usuario.correo || !usuario.password || !usuario.rol || !usuario.telefono || !usuario.estado || !usuario.username || !['Activo','Inactivo'].includes(usuario.estado)) {
        return res.status(403).json({ status: 403, message: 'Todos los campos son requeridos' });
    }

    const saltRound=10;
    const hash = await bcrypt.hash(usuario.password, saltRound);

    const sql = `UPDATE Usuarios SET Nombre=?, Apellido=?, Correo=?, Password=?, Rol=?, Telefono=?, Estado=?, Username=? WHERE idUsuarios=?`;

    pool.query(sql,[usuario.nombre,usuario.apellido,usuario.correo,hash,usuario.rol,usuario.telefono,usuario.estado,usuario.username,id],(error, results) => {
            if (error) {
                console.log('Existe un error en la consulta SQL');
                return res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
            }
            res.status(200).json({ status: 200, message: 'Usuario actualizado correctamente'});

        });

});


// Api delete usuario
router.delete('/delete/:id', (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM Usuarios WHERE idUsuarios = ?";

    pool.query(sql, [id], (error, results) => {

        if (error) {
            console.log('Existe un error en la consulta SQL');
            return res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ status: 200, message: 'Usuario eliminado correctamente' });

    });

});




module.exports = router;