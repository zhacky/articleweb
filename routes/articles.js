/**
 * Author: Zhack Ariya
 * Sample Article Routes
 */
const schema = require('./schema/articles');
const db = require('../models/article');

function articleRoutes(fastify, options, done) {
	/**  How these routes are declared:
	 *   1. HTTP endpoint (e.g. fastify.get('/articles'))
	 *   2. Schema https://json-schema.org
	 *   3. JWT Authentication hook (prevalidation to check for a valid token)
	 *   4. Handler Method And Callback (Logic calls to DB Model)
	 * 
	 */

	// Get all articles -------------------------------------------------------
	fastify.get('/articles',
		{
			...schema.getAllArticles,
			preValidation: [fastify.jwtauthentication],
			handler: (req, reply) => {
				db.find()
					.then(articles => {
						reply.code(200).send(articles);
					});
			}
		});
	done();
	// Get 1 article -------------------------------------------------------
	fastify.get('/articles/:id', {
		...schema.getArticle,
		preValidation: [fastify.jwtauthentication],
		handler: (req, reply) => {
			db.findById(req.params.id)
				.then(article => {
					reply.code(200).send(article);
				});
		}
	});
	done();
	// Add 1 article -------------------------------------------------------
	fastify.post('/articles', {
		...schema.postArticle,
		preValidation: [fastify.jwtauthentication],
		handler: (req, reply) => {
			const article = req.body;
			db.add(article).then(article => reply.code(201).send(article));
		}
	});
	done();
	// Update 1 article -------------------------------------------------------
	fastify.put('/articles/:id', {
		...schema.updateArticle,
		preValidation: [fastify.jwtauthentication],
		handler: (req, reply) => {
			const { id } = req.params;
			const article = req.body;
			let forUpdate = {...article, id: id};
			db.update(id, forUpdate).then(count => reply.code(200).send(`Updated ${count} article.`));
		}
	});
	done();
	// Remove 1 article -------------------------------------------------------
	fastify.delete('/articles/:id', {
		...schema.removeArticle,
		preValidation: [fastify.jwtauthentication],
		handler: (req, reply) => {
			const {id} = req.params;
			db.remove(id).then(count => {
				count > 0 ? reply.code(200).send(`Deleted ${count} article.`)
					: reply.code(400).send('No article was deleted. Invalid params.');
			});
		}
	});
	done();

}

module.exports = articleRoutes;