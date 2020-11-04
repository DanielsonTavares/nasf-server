import { NextFunction, Request, Response } from 'express';
import Pessoa from '../models/pessoaModel';

async function verificaExistencia(id: String, response: Response) {
  const result = await Pessoa.findById(id);
  if (!result) {
    response.status(404).json({ message: `Não foi encontrato registro para o id ${id}` });
  }
}

class PessoaController {
  async post(request: Request, response: Response, next: NextFunction) {
    try {
      const { body } = request;

      const pessoa = new Pessoa(body);
      await pessoa.create();

      response.status(201).json({ ok: true, message: 'Recurso criado com sucesso', body });
    } catch (error) {
      response.status(500).json({ ok: false, mensagem: 'Não foi possível criar o recurso', detalhes: error });
      console.log(`error ==> ${error}`);
      next();
    }
  }

  async put(request: Request, response: Response, next: NextFunction) {
    const { body } = request;

    await verificaExistencia(body.id, response);

    const pessoa = new Pessoa(body);

    await pessoa.update();

    response.status(201).json({ ok: true, message: 'Atualizado com sucesso' });
    next();
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { body } = request;

    try {
      await verificaExistencia(body.id, response);

      const pessoa = new Pessoa(body);
      pessoa.delete();

      response.status(200).json({ ok: true, message: 'exclusão realizada com sucesso' });
    } catch (error) {
      response.status(500).json({ ok: false, message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
    next();
  }

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Pessoa.findAll();
      response.status(200).json({ result });
    } catch (error) {
      response.status(500).json({ ok: false, message: `${error.severity} - ${error.detail}` });
      console.log(`error ==> ${error}`);
    }
    next();
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    await verificaExistencia(id, response);

    const result = await Pessoa.findById(id);

    response.status(200).json(result);
    next();
  }
}

export default PessoaController;
