const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const authService = require('../../services/authService');
const Materias = require('../../services/materias');
const axios = require('axios');

// // Ruta para obtener datos de la API
// router.get('/materias', async (req, res) => {
//     const data = await Materias.getMaterias();
//     res.json( data )
//   });

  router.delete('/materias/:id', async (req, res) => {
     await Materias.destroy({
      where: {
          id: id
      }
    });
    res.json({ message: 'Usuario eliminado exitosamente', });
  });

module.exports = router;