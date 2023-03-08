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

	fastify.post('/register', (req, reply) => {
		const user = req.body;
		if(!user){
			reply.code(500).send({message: 'User details invalid...'});
		}
		// Enter into database

		// return a token
		const token = fastify.jwt.sign({user: user.name, expiresIn: 86400});
		reply.code(200).send({token, user });
	});
	done();
}

module.exports = authRoutes;