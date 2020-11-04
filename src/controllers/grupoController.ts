import { NextFunction, Request, Response } from 'express';
import Grupo from '../models/grupoModel';
import ErrorHandler from '../models/Erro';

async function verificaExistencia(id: String) {
  const result = await Grupo.findOne(id);
  if (!result) {
    throw new ErrorHandler(404, 'Não foi encontrato registro para o id');
  }
}

class GrupoController {
  async post(request: Request, response: Response, next: NextFunction) {
    try {
      const { body } = request;

      if (!body.nome) {
        throw new ErrorHandler(400, 'Nome não informado. ');
      }

      const str: string = body.nome;

      if (str.length <= 3) {
        throw new ErrorHandler(400, 'Nome muito curto. ');
      }

      const grupo = new Grupo(body);

      await grupo.create();

      response.status(201).json({ ok: true, message: 'Recurso criado com sucesso', body });
    } catch (e) {
      next(e);
    }
  }

  async put(request: Request, response: Response, next: NextFunction) {
    try {
      const { body } = request;

      await verificaExistencia(body.id);

      const grupo = new Grupo(body);

      await grupo.update();

      response.status(201).json({ ok: true, message: 'Atualizado com sucesso' });
    } catch (e) {
      next(e);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { body } = request;
      await verificaExistencia(body.id);

      const grupo = new Grupo(body);
      grupo.delete();

      response.status(200).json({ ok: true, message: 'exclusão realizada com sucesso' });
    } catch (e) {
      next(e);
    }
  }

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Grupo.findAll();
      response.status(200).json({ result });
    } catch (e) {
      // throw new ErrorHandler(500, e);
      next();
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      await verificaExistencia(id);

      const result = await Grupo.findById(id);

      response.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default GrupoController;
