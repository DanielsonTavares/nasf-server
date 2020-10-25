exports.up = (knex) => knex.schema.createTable('pessoa', (table) => {
  // identificacao
  table.increments('id').comment('Identificador da pessoa');
  table.string('nome', 100).comment('Nome completo da pessoa');
  table.datetime('nascimento').comment('Data de nascimento');
  table.enu('sexo', ['F', 'M']).comment('Sexo (F - Feminino; M - Masculino)');

  // contato
  table.string('email', 100).comment('Email da pessoa');
  table.string('ddd_fixo', 2).comment('DDD telefone fixo');
  table.string('tel_fixo', 8).comment('Número do telefone fixo');
  table.string('ddd_cel', 2).comment('DDD telefone celular');
  table.string('tel_cel', 9).comment('Número do telefone celular');
  table.string('cep', 8).comment('Número do CEP');
  table.string('tipo_logradouro', 20).comment('Tipo do logradouro');
  table.string('logradouro', 255).comment('Nome do logradouro');
  table.string('numero_logradouro', 10).comment('Número do logradouro');
  table.string('complemento', 100).comment('Complemento do logradouro');
  table.string('bairro', 50).comment('Nome do bairro');
  table.string('cidade', 50).comment('Nome da cidade');
  table.string('uf', 2).comment('Unidade federativa');

  // documentacao
  table.string('cpf', 11).comment('Número do CPF');
  table.string('rg', 9).comment('Número do RG');

  //
  table.datetime('data_criacao').defaultTo(knex.fn.now(6));
  table.datetime('data_atualizacao');
});

exports.down = (knex) => knex.schema.dropTable('pessoa');
