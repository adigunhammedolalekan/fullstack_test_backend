
/*
* Load env variables
*/
require('dotenv').config({path : '../app.env'});

//init express
var express = require('express');
var app = express();

//Test dotenv, should output email value inside app.env
app.get('/', (req, res) => {
	res.send('Hello ' + process.env.email);
});


/*
* General error/crash handler
*/
app.use((err, req, res, next) => {

	res.status(err.status || 500);
	res.json({
		'status' : false,
		'message' : 'Something went wrong!'
	})
})

/*
* Handles 404
*/
app.use((req, res, next) => {
	res.status(404).json({
		'status' : false,
		'message' : 'Requested path not found on this server'
	});
});

//Starts server => http://localhost:3002
app.listen(process.env.PORT, (err) => {

	if (!err) {
		var address = 'localhost:' + process.env.PORT;
		console.log('Server started at ' + address);
	}
})