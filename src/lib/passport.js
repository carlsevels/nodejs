const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

//Users
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT rol.nombre, rol.id as rolId, users.userId as id, users.id, users.perEditarId, users.perEliminarId, users.nombre, users.apellido_paterno, users.apellido_materno, users.fotografia, users.email, users.password FROM users INNER JOIN rol ON users.rolId = rol.id where users.email = ?', [email]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await (password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido M.V.Z. ' + user.nombre));
        } else {
            done(null, false);
        }
    } else {
        return done(null, false);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });