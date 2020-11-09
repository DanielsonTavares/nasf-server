import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../models/Erro';
import Pessoa from '../models/pessoasModel';

// async function verificaExistencia(id: String) {
//   const result = await Pessoa.findOne(id);
//   if (!result) {
//     throw new ErrorHandler(404, 'Não foi encontrado registro para o id');
//   }
// }

class PessoaController {
  async post(request: Request, response: Response, next: NextFunction) {
    try {
      const { data } = request.body;

      const id = await Pessoa.create(data);

      response.status(201).json({ message: 'Recurso criado com sucesso.', location: `/pessoas/${id}`, data: { id } });
    } catch (e) {
      next(e);
    }
  }

  // async put(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const { body } = request;

  //     await verificaExistencia(body.id);

  //     const grupo = new Pessoa(body);

  //     await grupo.update();

  //     response.status(201).json({ ok: true, message: 'Atualizado com sucesso' });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async delete(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const { body } = request;
  //     await verificaExistencia(body.id);

  //     const grupo = new Pessoa(body);
  //     grupo.delete();

  //     response.status(200).json({ ok: true, message: 'exclusão realizada com sucesso' });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Pessoa.findAll();
      response.status(200).json({ result });
    } catch (e) {
      next(e);
    }
  }

  async getByName(request: Request, response: Response, next: NextFunction) {
    try {
      const { nome } = request.params;

      const result = await Pessoa.findByName(nome);
      response.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  async getBySearch(request: Request, response: Response, next: NextFunction) {
    try {
      const filters = request.query;

      console.log(`filters ==> ${JSON.stringify(filters)}`);
      console.log(`filters.nome ==> ${JSON.stringify(filters.nome)}`);

      const result = await Pessoa.findByName(filters.nome as string);

      console.log(`result ==> ${JSON.stringify(result)}`);

      response.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }

  // async getById(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const { id } = request.params;

  //     await verificaExistencia(id);

  //     const result = await Pessoa.findById(id);

  //     response.status(200).json(result);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export default PessoaController;
