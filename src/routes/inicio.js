const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const nodemailer = require("nodemailer");

router.get('/', isLoggedIn, async (req, res) => {
    // const propietarios = await pool.query('SELECT propietarios.id as propietarioId, propietarios.statusId, propietarios.nombre, propietarios.apellido_paterno, propietarios.apellido_materno, propietario_datos.calle, propietario_datos.colonia, propietario_datos.municipio, propietario_datos.telefono, propietario_datos.email FROM propietarios INNER JOIN propietario_datos ON propietarios.datosId = propietario_datos.id WHERE propietarios.userId = ? order by nombre asc', [req.user.id]);
    // console.log({propietarios})
    // res.render('propietarios/propietarios', { propietarios });
    console.log("INICIO RESPONSE");
});

module.exports = router;