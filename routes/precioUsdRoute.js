const express = require('express');
const pool = require('../config/db');
require('dotenv').config();
const router = express.Router();


// GET /precio-usd/:id
// Convierte Vehiculos.Precio a USD usando una tasa fija.
// Define `USD_RATE` en .env como "moneda_local_por_1_USD" (ej: 25 para Lempiras).
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return res.status(403).json({ status: 403, message: 'id inválido' });
  }

  const usdRate = Number(process.env.USD_RATE);
  if (!Number.isFinite(usdRate) || usdRate <= 0) {
    return res.status(500).json({ status: 500, message: 'Config faltante: USD_RATE' });
  }

  const sql = 'SELECT idVehiculo, Marca, Modelo, Precio FROM Vehiculos WHERE idVehiculo = ?';

  pool.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ status: 500, message: 'Ocurrio un error en la consulta..' });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 404, message: 'Vehículo no encontrado' });
    }

    const vehiculo = results[0];
    const precioLocal = Number(vehiculo.Precio);
    const precioUsd = precioLocal / usdRate;

    return res.status(200).json({
      status: 200,
      message: 'Success',
      data: {
        idVehiculo: vehiculo.idVehiculo,
        Marca: vehiculo.Marca,
        Modelo: vehiculo.Modelo,
        Precio_Local: precioLocal,
        USD_RATE: usdRate,
        Precio_USD: Number(precioUsd.toFixed(2)),
      },
    });
  });
});

module.exports = router;

