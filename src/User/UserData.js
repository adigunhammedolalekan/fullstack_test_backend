const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

async function verifyEmail(data) {
	try {
		if (data.email === EMAIL) {
			return await data;
		} else {
			throw new Error('User not found');
		}
	} catch (ex) {
		throw ex;
	}
}

async function verifyPassword(data) {
	try {
		if (data.password === PASSWORD) {
			return await data;
		} else {
			throw new Error('Password mismatch');
		}
	} catch (ex) {
		throw ex;
	}
}

module.exports = { verifyEmail, verifyPassword };
