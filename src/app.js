require('dotenv').config()
require('./db/mongoose')

// Dependencies
const request = require('request');
const https = require('https');
const path = require('path')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const cors = require("cors");
const ejs = require("ejs");
const _ = require('lodash');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('../config/passport')(passport);
//const expressLayouts = require('express-ejs-layouts');

// Router paths
const authRoutes = require('./routers/auth');
const jobRoutes = require('./routers/job')
const studentRoutes = require('./routers/student')
const scheduleRoutes = require('./routers/schedule');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// ejs Config, Middleware
//app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', viewsPath)
app.use(express.urlencoded({
    extended: false
}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// BodyParser middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

app.use(express.json())

app.use(jobRoutes)
app.use(studentRoutes)
app.use(scheduleRoutes);
app.use(authRoutes);

// Home GET Route
app.get("/", (req, res) => {
    res.redirect("/login")
});

// PORT = 3000
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});
