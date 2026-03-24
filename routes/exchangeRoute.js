const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.EXCHANGE_API_KEY;

if (!API_KEY) {
  console.log('Error: falta EXCHANGE_API_KEY en el archivo .env');
}

// Obtener todas las tasas desde una moneda base
router.get('/latest/:base', async (req, res) => {
  try {
    const base = req.params.base.toUpperCase();

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
    );

    if (response.data.result !== 'success') {
      return res.status(400).json({
        status: 400,
        message: 'No se pudieron obtener las tasas de cambio',
        data: response.data
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Tasas obtenidas correctamente',
      monedaBase: response.data.base_code,
      ultimaActualizacion: response.data.time_last_update_utc,
      proximaActualizacion: response.data.time_next_update_utc,
      tasas: response.data.conversion_rates
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error al consumir ExchangeRate-API',
      error: error.message
    });
  }
});

// Convertir un monto entre dos monedas
router.get('/convert', async (req, res) => {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({
        status: 400,
        message: 'Debe enviar los parámetros from, to y amount'
      });
    }

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from.toUpperCase()}/${to.toUpperCase()}/${amount}`
    );

    if (response.data.result !== 'success') {
      return res.status(400).json({
        status: 400,
        message: 'No se pudo realizar la conversión',
        data: response.data
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Conversión realizada correctamente',
      monedaOrigen: response.data.base_code,
      monedaDestino: response.data.target_code,
      tasaConversion: response.data.conversion_rate,
      cantidadIngresada: Number(amount),
      resultado: response.data.conversion_result
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error al convertir monedas',
      error: error.message
    });
  }
});

module.exports = router;