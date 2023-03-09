/**
 * Author: Zhack Ariya
 * Schema for Users
 */
//-----------------OBJECT SCHEMA FOR VALIDATIONS--------------
const User = {
	type: 'object',
	description: 'A single user object',
	properties: {
		id: { type: 'number', description: 'User ID', 'readOnly': true },
		name: { type: 'string', minLength: 3 },
		email: { description: 'Email of the user', type: 'string', format: 'email' },
		phone: { description: 'Phone number', type: 'string', format: 'regex', pattern: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$' },
		password: { description: 'Password', type: 'string', minLength: 8 },
	}
};

const UserLogin = {
	type: 'object',
	description: 'Email-Password pair for user login',
	required: ['email','password'],
	properties: {
		email: { description: 'Email of the user', type: 'string', format: 'email' },
		password: { description: 'Password', type: 'string', minLength: 8 }
	}
};

const UserRegistration = {
	type: 'object',
	description: 'A single user object for registration.',
	required: ['name', 'email', 'phone', 'password'],
	properties: {
		name: { type: 'string', minLength: 3 },
		email: { description: 'Email of the user', type: 'string', format: 'email' },
		phone: { description: 'Phone number', type: 'string', format: 'regex', pattern: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$' },
		password: { description: 'Password', type: 'string', minLength: 8 },
	}
};

// --------------------------------------end-------------------
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
};


const getUser = {
	schema: {
		description: 'Get a single user by id',
		tags: ['USERS'],
		response: {
			200: User
		}
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
	}
};

const updateUser = {
	schema: {
		description: 'Update a single user',
		tags: ['USERS'],
		params: User.id,
		body: User,
		response: {
			200: { type: 'string', default: `Updated user ${User.id}` }
		}
	}
};

const removeUser = {
	schema: {
		description: 'Removes a user',
		tags: ['USERS'],
		params: User.id,
		response: {
			202: {type: 'string', default: 'User has been deleted.'}
		}
	}
};

// --------------------------------------
// login

const loginUser = {
	schema: {
		description: 'Log In and authenticate a user with email and password',
		tags: ['AUTH'],
		body:  UserLogin,
		response: {
			200: {
				type: 'object',
				properties: {
					token: { type: 'string' }
				}
			},
			400: {
				type: 'string',
				default: 'Invalid or empty credentials'
			},
			401: {
				type: 'string',
				default: 'Unauthorized'
			},
			404: {
				type: 'string',
				default: 'Not found.'
			}
		}
	}
};

const registerUser = {
	schema: {
		description: 'Register a user and receive an initial token.',
		tags: ['AUTH'],
		body: UserRegistration,
		response: {
			200: {
				type: 'object',
				properties: {
					token: { type: 'string' }
				}
			},
			400: {
				type: 'string',
				default: 'Invalid or empty credentials'
			}
		}

	}
};

module.exports = { getAllUsers, getUser, postUser, updateUser, removeUser, loginUser, registerUser };