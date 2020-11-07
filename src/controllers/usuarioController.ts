import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../models/Erro';
import Usuario from '../models/usuarioModel';

async function verificaExistencia(id: String) {
  const result = await Usuario.findOne(id);
  if (!result) {
    throw new ErrorHandler(404, 'Não foi encontrado registro para o id');
  }
}

class UsuarioController {
  async post(request: Request, response: Response, next: NextFunction) {
    try {
      const { data } = request.body;

      if (!data.login) {
        throw new ErrorHandler(400, 'Login não pode ser nulo');
      }

      const usuario = new Usuario(data);
      const id: number = await usuario.create();

      response.status(201).json({ message: 'Recurso criado com sucesso.', location: `/usuario/${id}` });
    } catch (e) {
      next(e);
    }
  }

  async put(request: Request, response: Response, next: NextFunction) {
    try {
      const { data } = request.body;

      await verificaExistencia(data.id);

      const usuario = new Usuario(data);

      await usuario.update();

      response.status(201).json({ data });
    } catch (e) {
      next(e);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { body } = request;
      await verificaExistencia(body.id);

      const usuario = new Usuario(body);
      usuario.delete();

      response.status(200).json({ ok: true, message: 'exclusão realizada com sucesso' });
    } catch (e) {
      next(e);
    }
  }

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      // const result = await knex('usuario').select('*');
      const result = await Usuario.findAll();
      response.status(200).json({ result });
    } catch (e) {
      next(e);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      await verificaExistencia(id);

      const result = await Usuario.findById(id);

      response.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { data } = request.body;

      if (!data.login) {
        throw new ErrorHandler(400, 'Login não pode ser nulo');
      }

      const usuario = new Usuario(data);
      const isLogado = await usuario.login();

      if (isLogado) {
        response.status(200).json({ ok: true, message: `${usuario.getNome()} logado com sucesso` });
      } else {
        throw new ErrorHandler(401, `${usuario.getNome()} nao logado`);
      }
    } catch (e) {
      next(e);
    }
  }
}

export default UsuarioController;
