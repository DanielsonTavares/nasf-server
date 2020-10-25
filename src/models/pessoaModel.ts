import knex from '../database';

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
    await knex('pessoa').insert(this.pessoa);
  }

  async update() {
    this.pessoa.data_atualizacao = new Date();
    await knex('pessoa').where('id', this.pessoa.id).update(this.pessoa);
  }

  async delete() {
    await knex('pessoa').where('id', this.pessoa.id).del();
  }

  static async findAll(): Promise<IPessoa[]> {
    return knex('pessoa').select('*');
  }

  static async findById(id: String) {
    const qryResult = await knex('pessoa').where('id', id).count('id');

    if (qryResult[0].count <= 0) {
      return null;
    }

    return knex('pessoa').where({ id }).select('*');
  }
}

export default Pessoa;
