  const express = require('express');
  const mysql = require('mysql2');
  const pool = require('../config/db');
  const AuthMiddleware = require('../middleware/authMiddleware');

  require('dotenv').config();
  const router = express.Router(); 


  
  
  //Api para ver todos los usuarios
  router.get('/lista/usuarios',AuthMiddleware,(req,res)=>{
    const sql = 'SELECT * FROM Usuarios';
    pool.query(sql,(error,results)=>{
      if(error){
        console.log('Error en la consulta sql');
        return res.status(500).json({status:500,message:'Error en la consulta sql'});
      }
      return res.status(200).json({ status: 200, message: 'Success', data: results });

    });

  });

  module.exports = router;