import { Request, Response } from 'express';
import knex from '../database';

class UsuarioController {
  async post(request: Request, response: Response) {
    response.status(201).send('Rota POST');
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
    response.status(200).send('Rota GET');
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const result = await knex('usuario').where({ id }).select('nome');

    response.status(200).send(response.json(result));
  }
}

export default UsuarioController;
