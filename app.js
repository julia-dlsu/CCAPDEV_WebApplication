// All imports needed here
const express = require('express');
//const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
//const mongoose = require('./models/connection');
const app= express();
const fileUpload = require('express-fileupload');

app.use(fileUpload()); // for fileuploading

const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const MongoStore = require('connect-mongo')(session);
// Routes imports
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

// set handlebars as the apps view engine
app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine({
    extname: "hbs", 
    defaultLayout: "main"
}));

// Configuration for handling API endpoint data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// serve static files
app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: 'secretssecretsssecret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } //cookie set to  expire 24 hrs
}))

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
  });
var server = app.listen(3000, function() {
    console.log("Node server is running at port 3000....");
});

app.use('/', authRouter); // Login/registration routes
app.use('/', indexRouter); 