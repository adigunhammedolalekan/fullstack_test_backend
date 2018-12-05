require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const logger = require('./src/logger');

function onError(err) {
	if (err.syscall !== 'listen') {
      logger.log(err)
		throw err;
	}
	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	switch (err.code) {
		case 'EACCES':
			logger.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			logger.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw err;
	}
}

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	logger.info(`Server running on port ${bind}`);
}

const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
