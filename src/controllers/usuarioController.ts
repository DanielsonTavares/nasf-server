import { Request, Response } from 'express';
import knex from '../database';

class UsuarioController {
  async post(request: Request, response: Response) {
    try {
      const { nome } = request.body;

      await knex('usuario').insert({ nome });

      response.status(201).json({ message: 'Recurso criado com sucesso', body: request.body });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
    }
  }

  async put(request: Request, response: Response) {
    const { id } = request.params;
    response.status(201).send(`Rota PUT com ID ${id}`);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    response.status(200).send(`Rota DELETE com ID ${id}`);
  }

  async get(request: Request, response: Response) {
    const result = await knex('usuario').select('nome');

    response.status(200).send(response.json({ result }));
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const result = await knex('usuario').where({ id }).select('nome');

    response.status(200).send(response.json(result));
  }
}

export default UsuarioController;
