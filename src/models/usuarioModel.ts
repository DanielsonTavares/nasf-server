import knex from '../database';
import ErrorHandler from './Erro';

interface IUsuario {
  id?: Number,
  nome: String;
  login: String;
  senha: String;
  email: String;
  data_atualizacao?: Date;
}

class Usuario {
  private usu: IUsuario;

  constructor(param: IUsuario) {
    this.usu = param;
  }

  getNome() {
    return this.usu.login;
  }

  async create(): Promise<IUsuario> {
    try {
      await knex('usuario').insert(this.usu);
      return this.usu;
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  async update(): Promise<IUsuario> {
    try {
      this.usu.data_atualizacao = new Date();
      if (this.usu.id) {
        await knex('usuario').where('id', this.usu.id).update(this.usu);
      } else if (this.usu.login) {
        await knex('usuario').where('login', this.usu.login).update(this.usu);
      } else {
        throw new ErrorHandler(400, 'Id ou login deve ser informado');
      }

      return this.usu;
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  async delete() {
    try {
      let id: Number = 0;

      if (this.usu.id) {
        id = this.usu.id;
        await knex('usuario').where('id', id).del();
      } else if (this.usu.login) {
        await knex('usuario').where('login', this.usu.login).del();
      } else {
        throw new ErrorHandler(400, 'Id ou login deve ser informado');
      }
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findAll(): Promise<IUsuario[]> {
    try {
      return await knex('usuario').select('*');
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findById(id: String): Promise<IUsuario[]> {
    try {
      // const qryResult = await knex('usuario').where('id', id).count('id');

      // if (qryResult[0].count <= 0) {
      //   return {};
      // }

      return await knex('usuario').where({ id }).select('*');
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async findOne(id: String): Promise<boolean> {
    try {
      const qryResult = await knex('usuario').where('id', id).count('id');

      if (qryResult[0].count <= 0) {
        return false;
      }
    } catch (e) {
      throw new ErrorHandler(500, e);
    }

    return true;
  }

  async login() {
    try {
      const qryResult = await knex('usuario').where({ login: this.usu.login, senha: this.usu.senha }).count('login');

      if (qryResult[0].count <= 0) {
        return false;
      }

      return true;
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }
}

export default Usuario;
