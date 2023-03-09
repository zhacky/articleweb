/**
 * Author: Zhack Ariya
 * Sample Article Model / DB Queries
 */
const knex = require('knex');

const config = require('../knexfile.js');

const db = knex(config.development);


// find
const find = () => {
	const articles = db('articles');
	return articles;
};

// findById
const findById = (id) => {
	const article = db('articles').where('id', id).first();
	return article;
};

// add
const add = async (article) => {

	await db('articles').insert(article);
	return article;
	
};

// update
const update = async (id, article) => {
	return db('articles')
		.where({id: id})
		.update({...article, id: undefined }); //undefined makes it exempted from being changed.
	//For other types of sql, this is not needed.
};

// remove
const remove = async (id) => {
	return db('articles')
		.where({id: id})
		.del();
};

module.exports = { find, findById, add, update, remove };
