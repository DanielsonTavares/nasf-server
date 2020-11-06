import knex from '../database';
import ErrorHandler from './Erro';

interface IPessoa {
  id: Number;
  nome: String;
  nascimento: Date;
  sexo: String;
  email: String;
  ddd_fixo: String;
  tel_fixo: String;
  ddd_cel: String;
  tel_cel: String;
  cep: String;
  tipo_logradouro: String;
  logradouro: String;
  numero_logradouro: String;
  complemento: String;
  bairro: String;
  cidade: String;
  uf: String;
  cpf: String;
  rg: String;
  data_atualizacao: Date;
}

class Pessoa {
  private pessoa: IPessoa;

  constructor(param: IPessoa) {
    this.pessoa = param;
  }

  getNome() {
    return this.pessoa.nome;
  }

  async create() {
    try {
      await knex('pessoa').insert(this.pessoa);
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  async update() {
    try {
      this.pessoa.data_atualizacao = new Date();
      await knex('pessoa').where('id', this.pessoa.id).update(this.pessoa);
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  async delete() {
    try {
      await knex('pessoa').where('id', this.pessoa.id).del();
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findAll(): Promise<IPessoa[]> {
    try {
      return await knex('pessoa').select('*');
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findById(id: String) {
    try {
      const qryResult = await knex('pessoa').where('id', id).count('id');

      if (qryResult[0].count <= 0) {
        return null;
      }

      return await knex('pessoa').where({ id }).select('*');
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findOne(id: String): Promise<boolean> {
    try {
      const qryResult = await knex('pessoa').where('id', id).count('id');

      if (qryResult[0].count <= 0) {
        return false;
      }
    } catch (e) {
      throw new ErrorHandler(500, e);
    }

    return true;
  }
}

export default Pessoa;
