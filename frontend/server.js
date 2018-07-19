const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const axios = require('axios');

// Var
const port = process.env.PORT || 5500;
const app = express();

const HOST_URL = 'http://localhost:5000';
const EMAIL = 'debotosdas@gmail.com';

// general config
app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
// Path to public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

// API
require('./app/api/API')(app);

// Routes
// index page
app.get('/', function(req, res) {
  try {
    const getProfileData = () =>
      axios.get(`${HOST_URL}/api/profile/user/${EMAIL}`);
    const getPortfolioData = () =>
      axios.get(`${HOST_URL}/api/portfolio/user/${EMAIL}`);
    const getPortfolioCategoryData = () =>
      axios.get(`${HOST_URL}/api/portfolio/user/category/${EMAIL}`);
    const getBlogData = () => axios.get(`${HOST_URL}/api/blog/user/${EMAIL}`);

    const allResponse = axios
      .all([getProfileData(), getPortfolioCategoryData(), getPortfolioData(), getBlogData()])
      .then(
        axios.spread(function(profileRes, categoryRes, portfolioRes, blogRes) {
          const profile = profileRes.data;
          const portfolio = portfolioRes.data;
          const category = categoryRes.data;
          const blog = blogRes.data;
          // console.log('profile is => ', profile);
          // console.log('portfolio is =>', portfolio);
          // console.log('blog is =>', blog);
          res.render('index.ejs', { profile, category, portfolio, blog });
        })
      )
      .catch(ex => {
        console.log('Error => ', ex);
        res.status(404).render('404.ejs');
      });
  } catch (error) {
    console.error('Error => ', error);
    res.status(404).render('404.ejs');
  }
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res) {
  res.redirect('/');
});

// Server Start
app.listen(port, () => {
  console.log('Server Started at port ', port);
});
