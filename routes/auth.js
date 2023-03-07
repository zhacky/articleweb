/**
 * Author: Zhack Ariya
 * Authentication Route
 */
function authRoutes(fastify, options, done) {

	// console.log(` options: ${options.toString()}.`);
	fastify.post('/login', (req, reply) => {
		const user = req.body;

		// Mock user, this is after getting the user object
		// const user = {
		// 	id: 1,
		// 	username: 'zhack',
		// 	email: 'me@zhacky.com'
		// };
		console.log(user);
		if (!user) {
			reply.code(400).send({ message: 'User missing...' });
		}
		// DB Checks should be here
		// const token = fastify.jwt.sign(user, {expiresIn: 86400});

		const token = fastify.jwt.sign({ user: user, expiresIn: 86400 });
		const { username, email } = user;
		reply.code(200).send({ token, email, username });


	});
	done();
}

module.exports = authRoutes;