import knex from '../database';
import ErrorHandler from './Erro';
import * as Valida from '../utils/validations';

export interface IPessoa {
  id: number;
  nome: string;
  nascimento: Date;
  sexo: string;
  email: string;
  ddd_fixo: string;
  tel_fixo: string;
  ddd_cel: string;
  tel_cel: string;
  cep: string;
  tipo_logradouro: string;
  logradouro: string;
  numero_logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cpf: string;
  rg: string;
  data_atualizacao: Date;
}

const validaObrigatorio = (pessoa: IPessoa): void => {
  if (!pessoa.cpf) {
    throw new ErrorHandler(400, 'Cpf obrigatório');
  }

  if (!pessoa.nome) {
    throw new ErrorHandler(400, 'Nome obrigatório');
  }

  if (!pessoa.nascimento) {
    throw new ErrorHandler(400, 'Nascimento obrigatório');
  }

  if (pessoa.tel_fixo) {
    if (!pessoa.ddd_fixo) {
      throw new ErrorHandler(400, 'DDD do telefone fixo obrigatório');
    }
  }

  if (pessoa.tel_cel) {
    if (!pessoa.ddd_cel) {
      throw new ErrorHandler(400, 'DDD do telefone celular obrigatório');
    }
  }
};

const valida = (pessoa: IPessoa): void => {
  if (!Valida.cpf(pessoa.cpf)) {
    throw new ErrorHandler(400, 'Cpf inválido');
  }
};

export default {
  create: async (pessoa: IPessoa) => {
    try {
      validaObrigatorio(pessoa);
      valida(pessoa);

      const id: number = await knex('pessoa').insert(pessoa, 'id');
      return id;
    } catch (e) {
      // console.log(`e model ==> ${e}`);
      throw new ErrorHandler(e.code, e.message);
    }
  },

  findAll: async (): Promise<IPessoa[]> => {
    try {
      return await knex('pessoa').select('*');
    } catch (e) {
      throw new ErrorHandler(e.code, e.message);
    }
  },

  findByName: async (nome: string): Promise<IPessoa[]> => {
    try {
      return await knex('pessoa').where('nome', 'like', `%${nome}%`).select('*');
    } catch (e) {
      throw new ErrorHandler(e.code, e.message);
    }
  },
};
