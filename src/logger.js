const path = require('path');
const { createLogger, format, transports } = require('winston');
const { colorize, combine, timestamp, label, printf } = format;
const logDir = 'logs';

const logFormat = printf(info => {
	return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
	level: 'info',
	format: combine( label({ label: 'App' }), timestamp(), logFormat),
	transports: [
		new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
		new transports.File({ filename: path.join(logDir, 'debug.log'), level: 'info' }),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: combine(colorize(), label({ label: 'App' }), timestamp(), logFormat),
		}),
	);
}

module.exports = logger;
