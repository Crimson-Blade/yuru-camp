// Constants and Imports
const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const path = require('path');
const methodOverride = require('method-override')
const morgan = require('morgan');
const ejsMateEngine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');

// Connections and Initialising
const app = express();
mongoose.connect('mongodb://localhost:27017/yuru-camp', {
    useNewUrlParser: true, useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('Database connected');
});

// Middleware
app.set('view engine', 'ejs');
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.engine('ejs', ejsMateEngine);
app.use(express.static('public'));
app.use(flash());
// setup flash
app.use((req, res, next) => {
    // flash messages are stored in the session and accessible to templates
    res.locals.flashSuccess = req.flash('success');
    res.locals.flashError = req.flash('error');
    next();
})

//session

const sessionConfig = {
    secret: "Supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());


// Routes - Full CRUD
app.use('/campgrounds', require('./routes/campgrounds'));
app.use('/campgrounds/:id/reviews', require('./routes/reviews'));
app.get('/', (req, res) => {
    res.redirect('/campgrounds');
})

//Error Handling
app.use((err, req, res, next) => {
    console.log(err);
    if(!err.message)  err.message = 'Something went wrong';
    if(!err.statusCode)  err.statusCode = 500;
    res.status(err.statusCode).render('error', { err });
    next();
})
// Server
app.listen(port, () => {
    console.log(`Yuru Camp listening at http://localhost:${port}`)
})