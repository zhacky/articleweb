const fp = require('fastify-plugin');
const fsqlite = require('fastify-sqlite');

const fsqlite3 = async (fastify) => {
	fastify.register(fsqlite, {
		dbFile: fastify.config.SQLITEPATH,
		verbose: true,
		mode: fsqlite.sqlite3.OPEN_READWRITE | fsqlite.sqlite3.OPEN_CREATE
	}).ready();

};

module.exports = fp(fsqlite3);
