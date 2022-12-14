// Constants and Imports
const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const path = require('path');
const Campground = require('./models/campground');
const methodOverride = require('method-override')
const morgan = require('morgan');
const ejsMateEngine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
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
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.engine('ejs', ejsMateEngine);


// Routes - Full CRUD
app.get('/', (req, res) => {
    res.render('home')
});
app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}));
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', catchAsync(async (req, res, next) => {
        if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`)
    }))

app.get('/campgrounds/:id', catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground });
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
}))

app.put('/campgrounds/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}));

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))
app.get('*', (req, res) => {
    res.send("HELLOO BAKA")
})

//Error Handling
app.use((err, req, res, next) => {
    console.log(err);
    if(!err.message)  err.message = 'Something went wrong';
    if(!err.statusCode)  err.statusCode = 500;
    res.status(err.statusCode).render('error', { err });
})
// Server
app.listen(port, () => {
    console.log(`Yuru Camp listening at http://localhost:${port}`)
})