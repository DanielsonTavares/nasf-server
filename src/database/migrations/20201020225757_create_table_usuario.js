exports.up = (knex) => knex.schema.createTable('usuario', (table) => {
  table.increments('id').comment('Identificador do usuario');
  table.string('nome', 100).comment('Nome completo do usuario');
  table.string('login', 100).unique().notNullable().comment('Login de acesso do usuario');
  table.string('senha', 100).notNullable().comment('Senha do usuário');
  table.string('email', 100).notNullable().comment('Email do usuario');
  table.datetime('data_criacao');//.defaultTo(knex.fn.now(6));
  table.datetime('data_atualizacao');
});

exports.down = (knex) => knex.schema.dropTable('usuario');
