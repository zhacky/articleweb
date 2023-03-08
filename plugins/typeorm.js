const fp = require('fastify-plugin');
const dbConn = require('typeorm-fastify-plugin');

const typeOrm = async (fastify) => {
	fastify.register(dbConn,{
		type: 'sqlite',
		path: './articleweb.db'
	}).ready();
};

module.exports = fp(typeOrm);