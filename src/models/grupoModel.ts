import knex from '../database';
import ErrorHandler from './Erro';

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
    try {
      await knex('grupo').insert(this.grupo);
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  async update() {
    try {
      this.grupo.data_atualizacao = new Date();
      await knex('grupo').where('id', this.grupo.id).update(this.grupo);
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  async delete() {
    try {
      await knex('grupo').where('id', this.grupo.id).del();
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findAll(): Promise<IGrupo[]> {
    try {
      return await knex('grupo').select('*');
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findById(id: String) {
    try {
      const qryResult = await knex('grupo').where('id', id).count('id');

      if (qryResult[0].count <= 0) {
        return null;
      }

      return await knex('grupo').where({ id }).select('*');
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findOne(id: String): Promise<boolean> {
    try {
      const qryResult = await knex('grupo').where('id', id).count('id');

      if (qryResult[0].count <= 0) {
        return false;
      }
    } catch (e) {
      throw new ErrorHandler(500, e);
    }

    return true;
  }
}

export default Grupo;
