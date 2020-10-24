import { Request, Response } from 'express';
import knex from '../database';
import Usuario from '../models/usuarioModel';

class UsuarioController {
  async post(request: Request, response: Response) {
    try {
      const { body } = request;

      const usuario = new Usuario(body);
      await usuario.create();

      await knex('usuario').insert(usuario);

      response.status(201).json({ message: 'Recurso criado com sucesso', body });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async put(request: Request, response: Response) {
    const { body } = request;
    const { id } = request.params;

    const usuario = new Usuario(body);

    await knex('usuario').where('id', id).update(usuario);

    response.status(201).json({ message: 'Atualizado com sucesso' });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await knex('usuario').where('id', id).del();
      response.status(200).json({ message: 'exclusão realizada com sucesso' });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async get(request: Request, response: Response) {
    try {
      const result = await knex('usuario').select('*');
      response.status(200).json({ result });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const qryResult = await knex('usuario').where('id', id).count('id');

    if (qryResult[0].count <= 0) {
      response.status(404).json({ message: `Não foi encontrato registro para o id ${id}` });
    }

    const result = await knex('usuario').where({ id }).select('*');

    response.status(200).json(result);
  }
}

export default UsuarioController;
