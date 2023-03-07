/**
 * Author: Zhack Ariya
 * Fastify Server
 */
const fastify = require('fastify')({ logger: true });
const fenv = require('@fastify/env');
let secret = '';
let port = 0;

// Sequence must be Plugins -> Decorators -> Hooks -> Services

// #region  For swagger view, ignore this part 
fastify.register(require('@fastify/swagger'), {
	mode: 'dynamic',
	openapi: {
		info: { title: 'fastify-api', description: 'Demo Swagger for Article Web', version: '3.0.0' }
	},
});
fastify.register(require('@fastify/swagger-ui'), {
	routePrefix: '/docs',
	initOAuth: {},
	uiConfig: {
		docExpansion: 'list',
		deepLinking: false
	},
	staticCSP: true,
	transformStaticCSP: (header) => header
});
// #endregion ---end swagger ---

// Plugins
fastify.register(require('fastify-boom'));
fastify.register(require('fastify-bcrypt'));

// fastify env plugin (fenv)
const fenvOptions = {
	confKey: 'config',
	schema: {
		type: 'object',
		required: ['PORT', 'JWT_SECRET'],
		properties: {
			PORT: {
				type: 'number',
				default: 3000
			},
			JWT_SECRET: {
				type: 'string',
				default: '********',
			}
		}
	},
	data: process.env,
	dotenv: true,
	removeAdditional: true
};

fastify.register(fenv, fenvOptions).ready((err)=> {
	if (err) console.log(err);
	secret = fastify.config.JWT_SECRET;
	port = fastify.config.PORT;
});

// register the jwt plugin for authentication (note: changing servers might not retain old tokens if using a different secret key)
const jwtOptions = {
	secret: secret || 'mysecretstring'
};

fastify.register(require('@fastify/jwt'), jwtOptions);

// Decorators (Middleware)
fastify.register(require('./middleware/auth_middleware'));

// Hooks and Routes

// register the routes
fastify.register(require('./routes/items'));
fastify.register(require('./routes/auth'));


const start = async () => {
	try {
		await fastify.listen({ port: port || 5000 });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};


start();
