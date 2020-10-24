exports.up = (knex) => knex.schema.createTable('mensagens_sistema', (table) => {
  table.increments('id').comment('Identificador da mensagem');
  table.string('descricao', 255).comment('Descricao da mensagem');
  table.enu('tipo', ['A', 'E', 'I']).comment('Tipo da mensagem (A - Alerta; E - Erro; I - Informativo)');
  table.datetime('data_criacao').defaultTo(knex.fn.now(6));
  table.datetime('data_atualizacao');
});

exports.down = (knex) => knex.schema.dropTable('mensagens_sistema');
