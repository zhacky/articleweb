const knex = require('knex');

const config = require('../knexfile.js');

const db = knex(config.development);

const bcrypt = require('bcryptjs');


// find
const find = () => {
	const users = db('users');
	return users;
};
// findById

// add

const add = async (user) => {
	const password = user.password;
	const salt = bcrypt.genSaltSync(8);
	const hash = bcrypt.hashSync(password, salt);
	const userWithHash = {...user, password: hash};
	await db('users').insert(userWithHash);
	return {name: user.name, email: user.email};
};

// update

// remove


module.exports = { add, find };
