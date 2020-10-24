import knex from '../database';

interface IGrupo {
  id: String;
  nome: String;
  descricao: String;
  data_atualizacao: Date;
}

class Grupo {
  private grupo: IGrupo;

  constructor(param: IGrupo) {
    this.grupo = param;
  }

  getNome() {
    return this.grupo.nome;
  }

  async create() {
    await knex('grupo').insert(this.grupo);
  }

  async update() {
    this.grupo.data_atualizacao = new Date();
    await knex('grupo').where('id', this.grupo.id).update(this.grupo);
  }

  async delete() {
    await knex('grupo').where('id', this.grupo.id).del();
  }

  static async findAll(): Promise<IGrupo[]> {
    return knex('grupo').select('*');
  }

  static async findById(id: String) {
    const qryResult = await knex('grupo').where('id', id).count('id');

    if (qryResult[0].count <= 0) {
      return null;
    }

    return knex('grupo').where({ id }).select('*');
  }
}

export default Grupo;
