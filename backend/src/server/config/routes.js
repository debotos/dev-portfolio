const express = require('express');
const blog = require('../routes/blog');
const portfolio = require('../routes/portfolio');
const users = require('../routes/users');
const profile = require('../routes/profile');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use('/api/portfolio', portfolio);
  app.use('/api/blog', blog);
  app.use('/api/users', users);
  app.use('/api/profile', profile);
  app.use(error);
};
