/**
 * Author: Zhack Ariya
 * Sample User Routes
 */
const schema = require('./schema/users');
const db = require('../models/user');

function userRoutes(fastify, options, done) {
	/**  How these routes are declared:
	 *   1. HTTP endpoint (e.g. fastify.get('/users'))
	 *   2. Schema https://json-schema.org
	 *   3. JWT Authentication hook (prevalidation to check for a valid token)
	 *   4. Handler Method And Callback (Logic calls to DB Model)
	 * 
	 */

	// Get all users -------------------------------------
	const isAuth = fastify.config.JWT_ACTIVATE;
	console.log(`isAuth: ${isAuth}`);

	if (isAuth) {
		fastify.get('/users',
			{
				...schema.getAllUsers,
				preValidation: [fastify.jwtauthentication],
				handler: (req, reply) => {
					db.find()
						.then(users => {
							reply.code(200).send(users);
						});
				}
			});
	} else {
		fastify.get('/users', schema.getAllUsers);
	}

	done();
	// Get user -------------------------------------
	fastify.get('/users/:id',
		{
			...schema.getUser,
			preValidation: [fastify.jwtauthentication],
			handler: (req, reply) => {
				db.findById(req.params.id)
					.then(user => {
						reply.code(200).send(user);
					});
			}
		});
	done();

	// Add user with Encrypted Password --------------------
	fastify.post('/users', {
		...schema.postUser,
		preValidation: [fastify.jwtauthentication],
		handler: (req, reply) => {
			const user = req.body;
			fastify.bcrypt.hash(user.password)
				.then(hash => {
					const userWithHash = { ...user, password: hash };
					db.add(userWithHash)
						.then(user => {
							reply.code(201).send(user);
						}).catch(err => new Error(err));
				});

		}
	});
	done();
	// Update a user -------------------------------------
	fastify.put('/users/:id', {
		...schema.updateUser,
		preValidation: [fastify.jwtauthentication],
		handler: (req, reply) => {
			const { id } = req.params;
			const user = req.body;
			let forUpdate = { ...user, id: id };
			if (req.body.password) {
				fastify.bcrypt.hash(req.body.password)
					.then(hash => {
						forUpdate = { ...forUpdate, id: id, password: hash };
						db.update(id, forUpdate)
							.then(user => {
								reply.code(200).send(`Updated ${user} user`);
								done();
							});
					});
			} else {
				db.update(id, forUpdate)
					.then(user => {
						reply.code(200).send(`Updated ${user} user`);
					});
			}
		}
	});
	done();
	// Remove a user ----------------------------------
	fastify.delete('/users/:id',
		{
			...schema.removeUser,
			preValidation: [fastify.jwtauthentication],
			handler: (req, reply) => {
				const { id } = req.params;
				db.remove(id).then(count => {
					count > 0 ? reply.code(202).send(`Deleted ${count} user.`)
						: reply.code(400).send('No user was deleted. Invalid params.');
				});
			}
		});

	// Login user -------------------------------------
	fastify.post('/login', {
		...schema.loginUser,
		handler: (req, reply) => {
			db.login(req.body)
				.then(user => {
					if (!user) {
						reply.code(404).send('Not found.');
					} else {
						console.log(user);
						// check against hash
						fastify.bcrypt.compare(req.body.password, user.password)
							.then(isOk => {
								if (isOk) {
									console.log('Matched hashed password');
									const token = fastify.jwt.sign({ user: user.name, expiresIn: 600 });
									reply.code(200).send({ token });
								} else {
									console.log('Passwords did not match');
									reply.code(401).send('Invalid username or password');
								}
							});
					}
				});
		}
	});
	done();
	// Register a user -------------------------------------
	fastify.post('/register', {
		...schema.registerUser,
		handler: (req, reply) => {
			const user = req.body;
			db.findByEmail(user.email)
				.then(userFound => {
					if(userFound) {
						reply.code(400).send(`Email ${userFound.email} already exists.`);
					} else {
						fastify.bcrypt.hash(user.password)
							.then(hash => {
								const userWithHash = { ...user, password: hash };
								db.add(userWithHash).then(added => {
									console.log(`added: ${JSON.stringify(added)}`);
									reply.code(201).send({ token: fastify.jwt.sign({ user: user.name, expiresIn: 600 }) });
								});
							});
					}
				});
			

		}
	});
	done();
}

module.exports = userRoutes;