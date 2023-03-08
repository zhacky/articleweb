const Articles = require('./../../models/article');

const Article = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		title: { type: 'string' },
		summary: { type: 'string' },
		content: { type: 'string' },
		status: { type: 'string' },

	}
};

const getAllArticles = {
	schema: {
		description: 'Get all articles',
		tags: ['ARTICLES'],
		response: {
			200: {
				description: 'Success',
				type: 'array',
				articles: Article
			}
		}

	},
	handler: (req, reply) => {
		Articles.find()
			.then(articles => {
				reply.code(200).send(articles);
			});

	}
};

const postArticle = {
	schema: {
		description: 'Add single article',
		tags: ['ARTICLES'],
		body: Article,
		response: {
			201: Article
		}
	},
	handler: (req, reply) => {
		Articles.add(req.body)
			.then(article => {
				reply.code(201).send(article);
			});
	}
};

module.exports = { getAllArticles, postArticle };