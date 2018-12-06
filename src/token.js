const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

async function generateToken(data) {
	const email = data.email;
	try {
		const token = jwt.sign({ email }, JWT_SECRET);
		data.token = token;
		delete data.password;
		return data;
	} catch (ex) {
		throw ex;
	}
}

module.exports = generateToken;
