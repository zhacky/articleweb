/**
 * Author: Zhack Ariya
 * Sample Article Routes
 */
const opts = require('./_options/articles');

function articleRoutes(fastify, options, done) {

	// Get all articles
	

	fastify.get('/articles', opts.getAllArticles);
	done();

	fastify.post('/articles', opts.postArticle);
	done();

}

module.exports = articleRoutes;