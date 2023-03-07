/**
 * Author: Zhack Ariya
 * Auth Middleware Decorator
 */

const fp = require('fastify-plugin');

module.exports = fp(async (fastify)=> {
	fastify.decorate('jwtauthentication', async (req, reply) => {
		await req.jwtVerify();
		
		try {
			await req.jwtVerify();
			console.log('authenticated.');
			console.log('printing user information...');
			console.log(req.user);
			reply.code(200);
		} catch (err) {
			reply.send(err);
		}
	});
});

