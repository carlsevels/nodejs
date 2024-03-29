const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const { database } = require('./keys');

//Initialization
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
// app.set('json spaces', 2)

//Middleware
app.use(session({
    secret: 'nodejs1731896588909819181384',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentications'));
app.use('/inicio', require('./routes/inicio'));
app.use('/materias', require('./routes/materias'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static(path.join(__dirname, '/public')))

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
