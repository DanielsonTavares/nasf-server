exports.seed = (knex) =>
  // Deletes ALL existing entries
  knex('usuario').del()
    .then(() => knex('usuario').insert([
      { nome: 'danielson de oliveira tavares' },
      { nome: 'vanessa de araujo teixeira tavares' },
    ]));
