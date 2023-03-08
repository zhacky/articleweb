const knex = require('knex');

const config = require('../knexfile.js');

const db = knex(config.development);


// find
const find = () => {
	const articles = db('articles');
	return articles;
};
// findById

// add

const add = async (article) => {

	await db('articles').insert(article);
	return article;
	
};

// update

// remove


module.exports = { add, find };
