const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authService = require('../../services/authService');
const pool = require('../database');

//Users
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await authService.loginUser(email, password);
    if (user != null) {
        const users = user.dataValues;
        const validPassword = await (password, users.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido M.V.Z.' ));
        } else {
            done(null, false);
        }
    } else {
        return done(null, false);
    }
}));

passport.serializeUser(function(usersLogin, done) {
    done(null, usersLogin);
  });
  
  passport.deserializeUser(function(usersLogin, done) {
    done(null, usersLogin);
  });