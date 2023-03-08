const fp = require('fastify-plugin');
const knexJS = (fastify, options, done) => {
	options = {
		client: 'sqlite3',
		connection: {
			filename: fastify.config.SQLITEPATH
		},
		useNullAsDefault: true
	};
	const knex = require('knex')(options);
	if (!fastify.knex) {
		fastify.decorate('knex', knex);
		fastify.addHook('onClose', (fastify, done) => {
			if (fastify.knex === knex) {
				fastify.knex.destroy(done);
			}
		});
	}

	done();
};

module.exports = fp(knexJS);