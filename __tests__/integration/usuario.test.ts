/* eslint-disable no-undef */

import UsuarioModel from '../../src/models/usuarioModel';

const limpa = async () => {
  const usu01 = {
    email: 'usuario01@email.com',
    login: 'usuario01',
    nome: 'usuario zero um',
    senha: '01',
  };

  const usu02 = {
    email: 'usuario01@email.com',
    login: 'usuario02',
    nome: 'usuario zero um',
    senha: '01',
  };

  const usuario01 = new UsuarioModel(usu01);
  await usuario01.delete();

  const usuario02 = new UsuarioModel(usu02);
  await usuario02.delete();
};

limpa();

describe('UsuarioModel', () => {
  it('Deve inserir um usuario com login usuario01', async () => {
    const usu = {
      email: 'usuario01@email.com',
      login: 'usuario01',
      nome: 'usuario zero um',
      senha: '01',
    };

    const usuario = new UsuarioModel(usu);
    const result = await usuario.create();

    expect(result.login).toBe('usuario01');
  });

  it('Deve atualizar a senha do usuario01 para www', async () => {
    const usu = {
      email: 'usuario01@email.com',
      login: 'usuario01',
      nome: 'usuario zero um',
      senha: 'www',
    };

    const usuario = new UsuarioModel(usu);
    const result = await usuario.update();

    expect(result.senha).toBe('www');
  });

  it('Deve recuperar uma lista de usuários', async () => {
    const result = await UsuarioModel.findAll();

    expect(result.length).toBeGreaterThan(1);
  });

  it('Deve encontrar um usuário com ID 20', async () => {
    const result = await UsuarioModel.findOne('20');
    expect(result).toBe(true);
  });

  it('Não deve encontrar um usuário com ID 77', async () => {
    const result = await UsuarioModel.findOne('77');
    expect(result).toBe(false);
  });

  it('Deve recuperar um usuário com ID 20', async () => {
    const result = await UsuarioModel.findById('20');
    expect(result[0].login).toBe('dan');
  });
});
