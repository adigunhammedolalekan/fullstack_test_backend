const router = require('express').Router();
const LoginController = require('./controllers/LoginController');

router.post('/login', LoginController);

module.exports = router;
