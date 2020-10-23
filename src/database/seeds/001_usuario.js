exports.seed = (knex) =>
  // Deletes ALL existing entries
  knex('usuario').del()
    .then(() => knex('usuario').insert([
      {
        nome: 'danielson de oliveira tavares', login: 'dan', senha: '123456', email: 'dan@gmail.com',
      },
      {
        nome: 'vanessa de araujo teixeira tavares', login: 'vanessa', senha: 'van123', email: 'vanessa@gmail.com',
      },
      {
        nome: 'administrador', login: 'admin', senha: 'admin', email: 'admin@email.com',
      },
    ]));
