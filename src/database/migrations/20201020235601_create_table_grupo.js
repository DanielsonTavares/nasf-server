exports.up = (knex) => knex.schema.createTable('grupo', (table) => {
  table.increments('id');
  table.text('nome').unique().notNullable();
  table.text('descricao');
});

exports.down = (knex) => knex.schema.dropTable('grupo');
