const Users = require('./../../models/user');

const User = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		name: { type: 'string' },
		email: { type: 'string' },
		phone: { type: 'string' },
		password: { type: 'string' },
	}
};

const getAllUsers = {
	schema: {
		description: 'Get all users',
		tags: ['USERS'],
		response: {
			200: {
				description: 'Success',
				type: 'array',
				users: User
			}
		}

	},
	handler: (req, reply) => {
		Users.find()
			.then(users => {
				reply.code(200).send(users);
			});

	}
};

const postUser = {
	schema: {
		description: 'Add a single user',
		tags: ['USERS'],
		body: User,
		response: {
			201: User
		}
	},
	handler: (req, reply) => {
		Users.add(req.body)
			.then(user => {
				reply.code(201).send(user);
			});
		
	}
};


module.exports = { getAllUsers, postUser };