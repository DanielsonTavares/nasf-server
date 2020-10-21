exports.up = (knex) =>
  knex.schema.createTable("usuario", (table) => {
    table.increments("id");
    table.text("nome").unique().notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("usuario");
