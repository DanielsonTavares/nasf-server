import { Request, Response } from 'express';

class GrupoController {
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
    response.status(200).send(`Rota GET com ID ${id}`);
  }
}

export default GrupoController;
