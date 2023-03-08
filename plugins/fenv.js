const fp = require('fastify-plugin');
const fenv = require('@fastify/env');

const fastifyEnv = async (fastify) => {
	const fenvOptions = {
		confKey: 'config',
		schema: {
			type: 'object',
			required: ['PORT', 'JWT_SECRET', 'SQLITEPATH'],
			properties: {
				PORT: {
					type: 'number',
					default: 3000
				},
				JWT_SECRET: {
					type: 'string',
					default: '********',
				},
				SQLITEPATH: {
					type: 'string',
					default: './articleweb.db3'
				}
			}
		},
		data: process.env,
		dotenv: true,
		removeAdditional: true
	};

	await fastify.register(fenv, fenvOptions);
};

module.exports = fp(fastifyEnv);