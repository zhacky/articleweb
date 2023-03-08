/**
 * Author: Zhack Ariya
 * Auth Middleware Decorator
 */

const fp = require('fastify-plugin');

const authDecorator = async (fastify)=> {
	fastify.decorate('jwtauthentication', async (req, reply) => {
		await req.jwtVerify();
		
		try {
			await req.jwtVerify();
			console.log('authenticated.');
			reply.code(200);
		} catch (err) {
			reply.send(err);
		}
	});
};


module.exports = fp(authDecorator);

