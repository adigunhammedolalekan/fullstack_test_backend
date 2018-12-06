const auth = require('../src/auth')
const jwt = require('jsonwebtoken')
const httpMocks = require('node-mocks-http')

test('should generate a valid jsonwebtoken', () => {

	const email = 'test@gmail.com'
	const token = auth.generateToken(email)

	var decoded
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET)
	}catch(err) {}

	expect(decoded).not.toBeNull()
	expect(decoded.email).toBe('test@gmail.com')
})


test('verify jwt token', () => {
	
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNTQ0MDU3ODg2fQ.1jPENYXJJkUJBwmsv67H7yJXSl8YyNorEtg8Jkfzv1c'
	const req = httpMocks.createRequest({
		method: 'GET',
		url: '/',
		headers: {
			'authorization' : 'Bearer ' + token
		}
	})

	const res = httpMocks.createResponse()
	const next = jest.fn()

	auth.jwtMiddleware(req, res, next);

	expect(req.user).not.toBeNull()
	expect(req.user).toBe('test@gmail.com')
})

test('should return code 403 on invalid token', () => {
	var token = 'fQ.1jPENYXJJkUJBwmsv67H7yJXSl8YyNorEtg8Jkfzv1c'
	const req = httpMocks.createRequest({
		method: 'GET',
		url: '/',
		headers: {
			'authorization' : 'Bearer ' + token
		}
	})

	const res = httpMocks.createResponse()
	const next = jest.fn()

	auth.jwtMiddleware(req, res, next);

	expect(res.statusCode).toBe(403)
})

test('should return code 403 on invalid header format', () => {

	var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNTQ0MDU3ODg2fQ.1jPENYXJJkUJBwmsv67H7yJXSl8YyNorEtg8Jkfzv1c'
	const req = httpMocks.createRequest({
		method: 'GET',
		url: '/',
		headers: {
			'authorization' : token
		}
	})

	const res = httpMocks.createResponse()
	const next = jest.fn()

	auth.jwtMiddleware(req, res, next);
	expect(res.statusCode).toBe(403)
})