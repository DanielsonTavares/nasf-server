import knex from '../database';
import ErrorHandler from './Erro';

export interface IUsuario {
  id?: Number,
  nome: String;
  login: String;
  senha: String;
  email: String;
  data_atualizacao?: Date;
}

class Usuario {
  static async create(usuario: IUsuario): Promise<number> {
    try {
      const id: number = await knex('usuario').insert(usuario, 'id');
      return id;
    } catch (e) {
      throw new ErrorHandler(500, e);
    }
  }

  static async update(param: IUsuario): Promise<IUsuario> {
    try {
      const usu = param;
      usu.data_atualizacao = new Date();

      let result = [];

      if (usu.id) {
        result = await knex('usuario').where('id', usu.id).update(usu, '*');
      } else {
        throw new ErrorHandler(400, 'Id deve ser informado');
      }

      return result[0];
    } catch (e) {
      console.log(`e ==> ${e}`);
      throw new ErrorHandler(500, e);
    }
  }

  static async delete(params: { id: number }) {
    try {
      const { id } = params;

      if (id) {
        await knex('usuario').where('id', id).del();
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
      const result = await knex('usuario').where({ id }).select('*');

      return result[0];
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

  static async login(params: { login: string; password: string }) {
    try {
      const { login, password } = params;

      const qryResult = await knex('usuario').where({ login, senha: password }).count('login');

      if (qryResult[0].count <= 0) {
        return false;
      }

      return true;
    } catch (e) {
      console.log(`e ==> ${e}`);
      throw new ErrorHandler(500, e);
    }
  }
}

export default Usuario;
