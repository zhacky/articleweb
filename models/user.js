/**
 * Author: Zhack Ariya
 * Sample User Model / DB Queries
 */
const knex = require('knex');

const config = require('../knexfile.js');

const db = knex(config.development);


// find
const find = () => {
	const users = db('users');
	return users;
};

// findById
const findById = (id) => {
	const user = db('users')
		.where({ id: id })
		.first();

	return user;
};

// findByEmail
const findByEmail = async (email) => {
	console.log(`finding email...\n${email}`);
	return await db('users')
		.where('email', email).first();
};

// add
const add = async (user) => {
	await db('users').insert(user);
	return { name: user.name, email: user.email };
};

// update
const update = async (id, user) => {
	return db('users')
		.where({ id: id })
		.update({
			...user, id: undefined
		});

};

// remove
const remove = async (id) => {
	return db('users')
		.where({ id: id })
		.del();

};

// login

const login = async (login) => {
	const email = login.email;
	return db('users').where('email', email).first();
};

module.exports = { add, find, findById, findByEmail, update, remove, login };
