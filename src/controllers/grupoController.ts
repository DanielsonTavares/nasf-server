import { Request, Response } from 'express';
import Grupo from '../models/grupoModel';

async function verificaExistencia(id: String, response: Response) {
  const result = await Grupo.findById(id);
  if (!result) {
    response.status(404).json({ message: `Não foi encontrato registro para o id ${id}` });
  }
}

class GrupoController {
  async post(request: Request, response: Response) {
    try {
      const { body } = request;

      const grupo = new Grupo(body);
      await grupo.create();

      response.status(201).json({ message: 'Recurso criado com sucesso', body });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async put(request: Request, response: Response) {
    const { body } = request;

    await verificaExistencia(body.id, response);

    const grupo = new Grupo(body);

    await grupo.update();

    response.status(201).json({ message: 'Atualizado com sucesso' });
  }

  async delete(request: Request, response: Response) {
    const { body } = request;

    try {
      await verificaExistencia(body.id, response);

      const grupo = new Grupo(body);
      grupo.delete();

      response.status(200).json({ message: 'exclusão realizada com sucesso' });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async get(request: Request, response: Response) {
    try {
      const result = await Grupo.findAll();
      response.status(200).json({ result });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    await verificaExistencia(id, response);

    const result = await Grupo.findById(id);

    response.status(200).json(result);
  }
}

export default GrupoController;
