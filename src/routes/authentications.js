const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', (req, res) => {
    res.render('auth/signup')
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/inicioinvitado',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.get('/signinerror', isNotLoggedIn, (req, res) => {
    res.render('auth/signinerror');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/inicio',
        failureRedirect: '/signinerror',
        failureFlash: true,
        withCredentials: true,
    })(req, res, next);
    console.log(req.body)
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

module.exports = router;