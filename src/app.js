const express = require('express');
const router = require('./router');
const createError = require('http-errors');
const app = express();
const logger = require('./logger');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);

app.use((req, res, next) => next(createError(404)));

// handle app errors
app.use((err, req, res) => {
	logger.error(err);
	res.status(err.status || 500).json({
		error: err,
		message: 'Something went wrong!',
	});
});

module.exports = app;
