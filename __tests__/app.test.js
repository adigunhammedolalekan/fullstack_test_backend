require('dotenv').config();

const supertest = require('supertest');
const app = require('../src/app');

const request = supertest(app);
const BASE_ROUTE = '/api/v1/';
const INVALID_ROUTE = 'INVALID_ROUTE_(#)@';
const VALID_ROUTE = '/login';
const VALID_EMAIL = process.env.EMAIL;
const INVALID_EMAIL = 'invaliduser8493489@gmail';
const VALID_PASSWORD = process.env.PASSWORD;
const INVALID_PASSWORD = 'invalidpasswordatsalvista';

describe('Test app end to end', () => {
	test('should return 404 for invalid route', done => {
		return request.get(BASE_ROUTE + INVALID_ROUTE).then(response => {
			expect(response.statusCode).toBe(404);
			done();
		});
	});

	test('should return 500 for invalid email parameter', done => {
		const email = INVALID_EMAIL;
		const password = VALID_PASSWORD;
		request
			.post(BASE_ROUTE + VALID_ROUTE)
			.send({ email, password })
			.then(response => {
				expect(response.statusCode).toBe(500);
				expect(response.body).toHaveProperty('error', true);
				expect(response.body).toHaveProperty('body', 'Error: User not found');
				done();
			});
	});

	test('should return 500 for invalid password parameter', done => {
		const email = VALID_EMAIL;
		const password = INVALID_PASSWORD;
		request
			.post(BASE_ROUTE + VALID_ROUTE)
			.send({ email, password })
			.then(response => {
				expect(response.statusCode).toBe(500);
				expect(response.body).toHaveProperty('error', true);
				expect(response.body).toHaveProperty('body', 'Error: Password mismatch');
				done();
			});
	});

	test('should generate token for valid parameters', done => {
		const email = VALID_EMAIL;
		const password = VALID_PASSWORD;
		request
			.post(BASE_ROUTE + VALID_ROUTE)
			.send({ email, password })
			.then(response => {
				expect(response.statusCode).toBe(200);
				expect(response.body.body).toHaveProperty('token');
				expect(response.body.body).toHaveProperty('email', email);
				done();
			});
	});
});
