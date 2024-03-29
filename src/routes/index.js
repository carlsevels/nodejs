const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

router.get('/', (req, res) => {
    res.render('auth/signin');
});

// router.get('/', isLoggedIn, async (req, res, email, password) => {
//     const userDate = await authService.loginUser(email, password); 
//     const response = await axios.get('http://localhost:3000/inicio/materias'); // Reemplaza con la URL de tu API
//     const data = response.data;
//     console.log("MATERIAS: " + data);
//     console.log('Inicio');
//     res.render('materias/materias', {userDate, data});
// });

module.exports = router;