/**
 * Author: Zhack Ariya
 * Sample User Routes
 */
const opts = require('./_options/users');

function userRoutes(fastify, options, done) {

	// Get all users
	

	fastify.get('/users', opts.getAllUsers);
	done();
	
	fastify.post('/users', opts.postUser);
	done();
}

module.exports = userRoutes;