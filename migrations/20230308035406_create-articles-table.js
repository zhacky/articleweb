/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('articles', table => {
		table.increments();
		table.string('title', 128).notNullable();
		table.date('date');
		table.text('summary', 'longtext');
		table.text('content', 'longtext');
		table.enu('status',['pending','published']).defaultTo('pending');
	})
		.createTable('users', table => {
			table.increments();
			table.string('name', 128).notNullable();
			table.string('email', 128).notNullable();
			table.string('phone', 128);
			table.string('password', 128).notNullable();
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('article').dropTableIfExists('users');

};
