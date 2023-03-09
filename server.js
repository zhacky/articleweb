/**
 * Author: Zhack Ariya
 * Fastify Server
 */
const fastify = require('fastify')({ logger: true });

// const chalk = require('chalk');
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
//-----------------
// fastify error logging plugin
fastify.register(require('fastify-boom'));
// fastify encrypt plugin
fastify.register(require('fastify-bcrypt'),{ saltWorkFactor: 10});
// fastify env plugin (fenv)
fastify.register(require('./plugins/fenv')).ready((err) => {
	if (err) console.log(err);
	secret = fastify.config.JWT_SECRET;
	port = fastify.config.PORT;
});

// fastify jwt plugin for authentication (note: changing servers might not retain old tokens if using a different secret key)
fastify.register(require('@fastify/jwt'), { secret: secret || 'mysecretstring' });

// fastify cors plugin
fastify.register(require('@fastify/cors'), { origin: '*' });

// fastify sqlite3 plugin
fastify.register(require('./plugins/sqlite3'));
// fastify knex plugin
fastify.register(require('./plugins/knex'));

// Decorators (Middleware)
//-----------------
fastify.register(require('./plugins/auth_middleware'));

// Hooks and Routes
//-----------------
fastify.register(require('./routes/articles'));
fastify.register(require('./routes/users'));

// START the server
const start = async () => {
	try {
		await fastify.listen({ port: port || 5000 });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};


start();
