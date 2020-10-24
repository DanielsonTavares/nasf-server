exports.seed = (knex) =>
  // Deletes ALL existing entries
  knex('grupo').del()
    .then(() =>
      // Inserts seed entries
      knex('grupo').insert([
        { nome: 'administrador', descricao: 'Acesso total ao sistema' },
        { nome: 'coordenador', descricao: 'Acesso a todas as equipes' },
        { nome: 'padrao', descricao: 'Acesso padrão do sistema' },

      ]));
