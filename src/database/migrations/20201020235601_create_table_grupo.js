exports.up = (knex) => knex.schema.createTable('grupo', (table) => {
  table.increments('id').comment('Identificador do grupo');
  table.string('nome', 100).unique().notNullable().comment('Nome do grupo');
  table.string('descricao').comment('Descrição do grupo');
  table.datetime('data_criacao');//.defaultTo(knex.fn.now(6));
  table.datetime('data_atualizacao');
});

exports.down = (knex) => knex.schema.dropTable('grupo');
