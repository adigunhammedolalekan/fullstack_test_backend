function Failure(res, error, message) {
	if (error.isJoi) {
		return res.status(422).json({ body: error.message, message });
	} else {
		return res.status(error.status || 500).json({ body: error.message, message });
	}
}

function Success(res, body, message) {
	return res.status(200).json({ body, message });
}

module.exports = { Failure, Success };
