import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../models/Erro';
import Usuario from '../models/usuarioModel';
import * as Jwt from '../utils/jwt';

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

      const id: number = await Usuario.create(data);

      response.status(201).json({ message: 'Recurso criado com sucesso.', location: `/usuarios/${id}`, data: { id } });
    } catch (e) {
      next(e);
    }
  }

  async put(request: Request, response: Response, next: NextFunction) {
    try {
      const { data } = request.body;

      await verificaExistencia(data.id);

      await Usuario.update(data);

      response.status(201).json({ data });
    } catch (e) {
      next(e);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.body;
      await verificaExistencia(id);

      // const usuario = new Usuario(body);
      Usuario.delete({ id });

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

      console.log(`request ==> ${request.headers.authorization}`);

      response.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const [, hash] = request.headers.authorization ? request.headers.authorization?.split(' ') : [];

      const [login, password] = Buffer.from(hash, 'base64')
        .toString()
        .split(':');

      if (!login) {
        throw new ErrorHandler(400, 'Login não pode ser nulo');
      }
      if (!password) {
        throw new ErrorHandler(400, 'Password não pode ser nulo');
      }

      // const usuario = new Usuario(data);
      const isLogado = await Usuario.login({ login, password });

      if (isLogado) {
        const usu = await Usuario.find(login);
        const token = Jwt.sign(usu);
        request.headers.authorization = token;
        response.status(200).json({ ok: true, message: `${login} logado com sucesso`, token });
      } else {
        throw new ErrorHandler(401, `${login} nao logado`);
      }
    } catch (e) {
      next(e);
    }
  }

  async token(request: Request, response: Response, next: NextFunction) {
    try {
      const { data } = request.body;

      const token = Usuario.generateToken(data);
      const show = Jwt.verify(token);

      response.status(200).json({ token, show });
    } catch (e) {
      console.log(`e ==> ${e}`);
      next(e);
    }
  }
}

export default UsuarioController;
