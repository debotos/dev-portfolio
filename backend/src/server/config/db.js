const winston = require('winston')
const mongoose = require('mongoose')
const mongoURI = require('./credential/keys').mongoURI

module.exports = function () {
	mongoose
		.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => winston.info(`Connected to ${mongoURI}...`))
}
