const winston = require('winston');
const mongoose = require('mongoose');
const mongoURI = require('./credential/keys').mongoURI;

module.exports = function() {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => winston.info(`Connected to ${mongoURI}...`));
};
