const express = require('express');
// const blogs = require('../routes/blogs');
const portfolio = require('../routes/portfolio');
const users = require('../routes/users');
const profile = require('../routes/profile');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use('/api/portfolio', portfolio);
  // app.use('/api/blogs', blogs);
  app.use('/api/users', users);
  app.use('/api/profile', profile);
  app.use(error);
};
