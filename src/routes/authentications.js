const express = require('express');
const router = express.Router();
const authService = require('../../services/authService');
const bodyParser = require('body-parser');
const axios = require('axios');

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.use(bodyParser.json());


// Ruta para el registro de usuarios
  router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const newUser = await authService.registerUser(firstName, lastName, email, password);
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/signinerror', isNotLoggedIn, (req, res) => {
    res.render('auth/signinerror');
  });

  // Ruta para iniciar sesión de usuarios
  router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/inicio',
        failureRedirect: '/signinerror',
        failureFlash: true,
        // withCredentials: true,
    })(req, res, next);
    console.log(req.body)
  });

  router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  router.get('/inicio', isLoggedIn, async (req, res) => {
    // const response = await axios.get('http://localhost:3000/inicio/materias'); 
    // const data = response.data;
    res.render('inicio/inicio');
});


module.exports = router;