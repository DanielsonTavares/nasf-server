import knex from '../database';

interface IUsuario {
  id: Number,
  nome: String;
  login: String;
  senha: String;
  email: String;
  data_atualizacao: Date;
}

class Usuario {
  private usu: IUsuario;

  constructor(param: IUsuario) {
    this.usu = param;
  }

  getNome() {
    return this.usu.login;
  }

  async create() {
    await knex('usuario').insert(this.usu);
  }

  async update() {
    this.usu.data_atualizacao = new Date();
    await knex('usuario').where('id', this.usu.id).update(this.usu);
  }

  async delete() {
    await knex('usuario').where('id', this.usu.id).del();
  }

  static async findAll(): Promise<IUsuario[]> {
    return knex('usuario').select('*');
  }

  static async findById(id: String) {
    const qryResult = await knex('usuario').where('id', id).count('id');

    if (qryResult[0].count <= 0) {
      return null;
    }

    return knex('usuario').where({ id }).select('*');
  }

  async login() {
    const qryResult = await knex('usuario').where({ login: this.usu.login, senha: this.usu.senha }).count('login');

    if (qryResult[0].count <= 0) {
      return false;
    }

    return true;
  }
}

export default Usuario;
