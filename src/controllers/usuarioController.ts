import { Request, Response } from 'express';
import Usuario from '../models/usuarioModel';

async function verificaExistencia(id: String, response: Response) {
  const result = await Usuario.findById(id);
  if (!result) {
    response.status(404).json({ ok: false, message: `Não foi encontrato registro para o id ${id}` });
  }
}

class UsuarioController {
  async post(request: Request, response: Response) {
    try {
      const { body } = request;

      const usuario = new Usuario(body);
      await usuario.create();

      response.status(201).json({ message: 'Recurso criado com sucesso', body });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async put(request: Request, response: Response) {
    const { body } = request;

    await verificaExistencia(body.id, response);

    const usuario = new Usuario(body);

    await usuario.update();

    response.status(201).json({ ok: true, message: 'Atualizado com sucesso' });
  }

  async delete(request: Request, response: Response) {
    const { body } = request;

    try {
      await verificaExistencia(body.id, response);

      const usuario = new Usuario(body);
      usuario.delete();

      response.status(200).json({ ok: true, message: 'exclusão realizada com sucesso' });
    } catch (error) {
      response.status(500).json({ ok: false, message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async get(request: Request, response: Response) {
    try {
      // const result = await knex('usuario').select('*');
      const result = await Usuario.findAll();
      response.status(200).json({ result });
    } catch (error) {
      response.status(500).json({ message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    await verificaExistencia(id, response);

    const result = await Usuario.findById(id);

    response.status(200).json(result);
  }

  async login(request: Request, response: Response) {
    const { body } = request;

    const usuario = new Usuario(body);
    const isLogado = await usuario.login();

    if (isLogado) {
      response.status(200).json({ ok: true, message: `${usuario.getNome()} logado com sucesso` });
    } else {
      response.status(401).json({ ok: false, message: `${usuario.getNome()} nao logado` });
    }
  }
}

export default UsuarioController;
