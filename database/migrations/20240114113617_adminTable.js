/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('admin', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password');
        table.integer('role').defaultTo('0');
        table.integer('status').defaultTo('1');
        // table.timestamps(true,true)
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('admin')
};
