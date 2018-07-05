const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');

// Var
const port = process.env.PORT || 5500;
const app = express();

// general config
app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
// Path to public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

// Routes

// index page
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// API
require('./app/api/API')(app);

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res) {
  res.status(404).send('what???');
});

// Server Start
app.listen(port, () => {
  console.log('Server Started at port ', port);
});
