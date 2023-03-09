/**
 * Author: Zhack Ariya
 * Schema for Articles
 */
//-----------------OBJECT SCHEMA FOR VALIDATIONS--------------
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
};

const getArticle = {
	schema: {
		description: 'Get single article by Id',
		tags: ['ARTICLES'],
		response: {
			200: Article
		}

	},
};

const postArticle = {
	schema: {
		description: 'Add single article',
		tags: ['ARTICLES'],
		body: Article,
		response: {
			201: Article
		}
	}
};

const updateArticle = {
	schema: {
		description: 'Update single article',
		tags: ['ARTICLES'],
		params: Article.id,
		body: Article,
		response: {
			201: { type: 'string', default: `Updated article ${Article.id}`}
		}
	}
};

const removeArticle = {
	schema: {
		description: 'Removes an article',
		tags: ['ARTICLES'],
		params: Article.id,
		response: {
			202: {type: 'string', default: 'Article has been deleted.'}
		}
	}
};


module.exports = { getAllArticles, getArticle, postArticle, updateArticle, removeArticle };