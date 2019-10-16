
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl
        .string('username')
        .notNullable()
        .unique();
    tbl
        .string('password')
        .notNullable();
    tbl
        .string('department')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
