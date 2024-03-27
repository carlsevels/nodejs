const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

router.get('/', (req, res) => {
    res.render('auth/signin');
});

module.exports = app => {
    router.get('/', home.index)
    router.post('/pacientes/:idpaciente', image.index);
    router.post('/pacientes/add', images.create);
    router.post('/pacientes/:idpaciente', images.delete)
    app.use(router);
};

module.exports = router;