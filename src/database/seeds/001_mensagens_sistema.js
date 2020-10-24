exports.seed = (knex) =>
  // Deletes ALL existing entries
  knex('mensagens_sistema').del()
    .then(() =>
      // Inserts seed entries
      knex('mensagens_sistema').insert([
        { descricao: 'Registro não encontrado', tipo: 'E' },
        { descricao: 'Inclusão realizada com sucesso', tipo: 'I' },
        { descricao: 'Exclusão realizada com sucesso', tipo: 'I' },
        { descricao: 'Atualização realizada com sucesso', tipo: 'I' },
        { descricao: 'Login realizado com sucesso', tipo: 'I' },
        { descricao: 'Usuário/Senha inválidos', tipo: 'E' },
      ]));
