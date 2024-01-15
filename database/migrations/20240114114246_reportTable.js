/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employee_report', (table) => {
        table.increments('id');
        table.integer('employee_id').unsigned().notNullable();
        table.foreign('employee_id').references('employee_details.id');
        table.string('stick_count').defaultTo('0')
        table.string('reset_count').defaultTo('0')
        table.datetime('login_time')
        table.datetime('logout_time');
        // table.timestamps(true,true)
        table.timestamp('created_at').defaultTo(knex.fn.now());

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('employee_report')
};
