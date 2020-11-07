/* eslint-disable no-undef */

import request from 'supertest';
import app from '../../src/app';
import UsuarioModel from '../../src/models/usuarioModel';

import knex from '../../src/database';

describe('UsuarioModel', () => {
  afterAll(async (done) => {
    await knex.destroy();
    done();
  });

  it('Deve inserir um usuario com login usuario01', async (done) => {
    const usu = {
      email: 'usuario01@email.com',
      login: 'usuario01',
      nome: 'usuario zero um',
      senha: '01',
    };

    const usuario = new UsuarioModel(usu);
    const result = await usuario.create();

    expect(result.login).toBe('usuario01');

    done();
  });

  it('Deve atualizar a senha do usuario01 para www', async (done) => {
    const usu = {
      email: 'usuario01@email.com',
      login: 'usuario01',
      nome: 'usuario zero um',
      senha: 'www',
    };

    const usuario = new UsuarioModel(usu);
    const result = await usuario.update();

    expect(result.senha).toBe('www');

    done();
  });

  it('Deve recuperar uma lista de usuários', async (done) => {
    const result = await UsuarioModel.findAll();

    expect(result.length).toBeGreaterThan(1);

    done();
  });

  it('Deve encontrar um usuário com ID 20', async (done) => {
    const result = await UsuarioModel.findOne('20');
    expect(result).toBe(true);

    done();
  });

  it('Não deve encontrar um usuário com ID 77', async (done) => {
    const result = await UsuarioModel.findOne('77');
    expect(result).toBe(false);

    done();
  });

  it('Deve recuperar um usuário com ID 20', async (done) => {
    // const result = await UsuarioModel.findById('20');
    // expect(result[0].login).toBe('dan');

    const response = await request(app).get('/usuario/20');

    expect(response.status).toBe(200);

    done();
  });
});
