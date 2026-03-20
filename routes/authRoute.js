const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const router = express.Router(); // En vez del modulo principal de express se utiliza router.


//Api de login
router.post('/login',(req,res)=>{
  const login = req.body;
  if (!login.username||!login.password){
   return res.status(403).json({status:403,message:'Usuario y contraseña son requeridas'});
  }


  const sql = 'SELECT Username,Password FROM Usuarios WHERE Username = ? AND Estado = "Activo"';
  pool.query(sql,[login.username,login.password],async(error,results)=>{
    if(error){
      return res.status(500).json({satus:500,message:'Error en la consulta sql'});
    }
    if(results.length===0){
      return res.status(401).json({satus:401,message:'Nombre de usuario o contaseña no coinciden'});

    } 
    
    let user = results[0];
    const isMatch =await bcrypt.compare(login.password,user.Password);
    if(!isMatch){
      return res.status(401).json({satus:401,message:'Nombre de usuario o contaseña no coinciden'});
    }
    const token = jwt.sign({username: user.Username},process.env.JWT_SECRET_KEY,{expiresIn:'1H'}); // Metodo de creacion de tokens 
    return res.status(200).json({status:200,message:'Inicio de sesion exitoso',token:token});
  });

});

//Api para el primer usuario encriptado o encriptar texto 

router.get('/api/gethash/:texto',async(req,res)=>{
  const texto = req.params.texto;
  const SaltRound = 10;
  const hash = await bcrypt.hash(texto,SaltRound);
  
  res.send(hash);

  });


  //Api de register 
router.post('/Registro',async(req,res)=>{
    const usuario=req.body;
    if (!usuario.nombre||!usuario.apellido||!usuario.correo||!usuario.password||!usuario.rol||!usuario.telefono||!usuario.estado||!usuario.username||!['Activo','Inactivo'].includes(usuario.estado)){
   return res.status(403).json({status:403,message:'Todos los campos son requeridos'});
  }

  const SaltRound =10;
  const hash = await bcrypt.hash(usuario.password,SaltRound);
  const passwordEncriptada = hash;

  const sql = 'INSERT INTO Usuarios (Nombre,Apellido,Correo,Password,Rol,Telefono,Estado,Username)VALUES (?,?,?,?,?,?,?,?)';
  pool.query(sql,[usuario.nombre,usuario.apellido,usuario.correo,passwordEncriptada,usuario.rol,usuario.telefono,usuario.estado,usuario.username],(error,results)=>{

    if(error){
      console.log('Existe un error en la consulta SQL');
      res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
    }else {
      usuario.id = results.insertId;
      res.status(200).json({ status: 200, message: 'Success', data: usuario });
    }

  });

  });


module.exports = router;