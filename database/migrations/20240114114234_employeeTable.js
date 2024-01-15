/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employee_details', table => {
        table.increments('id');
        table.integer('admin_id').unsigned().notNullable();
        table.foreign('admin_id').references('admin.id');
        table.string('employee_id').notNullable();
        table.string('employe_name').notNullable();
        table.string('mobile_no').notNullable();
        table.string('address');
        table.integer('status').defaultTo('1');
        table.enu('gender', ['male', 'female']).defaultTo('female');
        // table.timestamps(true,true)
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('employee_details')
};
