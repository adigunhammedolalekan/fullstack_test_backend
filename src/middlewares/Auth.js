const JWT_SECRET = process.env;

function Auth(req, res, next) {
	const token = req.cookies.token || req.body.token || req.query.token || req.headers['x-access-token'];

	//check for authorization token and decode it
	if (token) {
		jwt.verify(token, JWT_SECRET, (err, result) => {
			if (err) {
				res.status(500).json({ body: `${err}`, error: true, message: 'Error in verifying token' });
			} else {
				res.locals.body = result;
				next();
			}
		});
	} else {
		return res.status(403).json({
			error: true,
			message: 'No Token Provided',
		});
	}
}

module.exports = Auth;
