// All imports needed here
const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express();
app.use(fileUpload()); // for fileuploading

const db = require(`./models/db.js`);

require('dotenv').config();
const uri = process.env.SERVER_DB_URI;
console.log(uri);
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

db.connect();

const PORT = process.env.PORT || 3000;
const secret = process.env.SECRET;

mongoose.connect(uri, options, (err) => {
  console.log(err? err : 'Established connection with MongoDB!');
});

const store = new MongoStore({
  url: uri,
  uri: uri,
  databaseName: 'test',
  collection: 'sessions',
})
store.on('error', err => console.log(err.message))

// set handlebars as the apps view engine
app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine({
    extname: "hbs", 
    defaultLayout: "main"
}));

// Configuration for handling API endpoint data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// serve static files
app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } //cookie set to  expire 24 hrs
  },
  store
));

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
  });

// Routes imports
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

// Login/registration routes
app.use('/', authRouter);
app.use('/', indexRouter);

app.use(function(req, res, next) {
  res.status(404).render('404');
});

app.listen(PORT, function() {
  console.log("Node server is running at http://localhost:3000....");
});