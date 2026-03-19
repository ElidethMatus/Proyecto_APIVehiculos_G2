const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', (req, res) => {

    const sql = "SELECT * FROM Vehiculos";

    pool.query(sql, (error, results) => {
        if (error) return res.status(500).json(error);
        res.json(results);
    });

});

router.get('/:id', (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM Vehiculos WHERE idVehiculo = ?";

    pool.query(sql, [id], (error, results) => {

        if (error) return res.status(500).json(error);

        if (results.length === 0) {
            return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
        }

        res.json(results[0]);

    });

});

router.post('/', (req, res) => {

    const { Marca, Modelo, Año, Color, Precio, Descripcion, Estado, Imagenes } = req.body;

    const sql = `
        INSERT INTO Vehiculos 
        (Marca, Modelo, Año, Color, Precio, Descripcion, Estado, Imagenes, Fecha_Ingreso)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    pool.query(
        sql,
        [Marca, Modelo, Año, Color, Precio, Descripcion, Estado, Imagenes],
        (error, results) => {

            if (error) return res.status(500).json(error);

            res.json({
                mensaje: "Vehiculo agregado",
                id: results.insertId
            });

        }
    );

});

router.put('/:id', (req, res) => {

    const id = req.params.id;

    const { Marca, Modelo, Año, Color, Precio, Descripcion, Estado, Imagenes } = req.body;

    const sql = `
        UPDATE Vehiculos 
        SET Marca=?, Modelo=?, Año=?, Color=?, Precio=?, Descripcion=?, Estado=?, Imagenes=? 
        WHERE idVehiculo=?
    `;

    pool.query(sql,
        [Marca, Modelo, Año, Color, Precio, Descripcion, Estado, Imagenes, id],
        (error, results) => {

            if (error) return res.status(500).json(error);

            if (results.affectedRows === 0) {
                return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
            }

            res.json({ mensaje: "Vehiculo actualizado" });

        });

});

router.delete('/:id', (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM Vehiculos WHERE idVehiculo = ?";

    pool.query(sql, [id], (error, results) => {

        if (error) return res.status(500).json(error);

        if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
        }

        res.json({ mensaje: "Vehiculo eliminado" });

    });

});

module.exports = router;