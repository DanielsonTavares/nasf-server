/* eslint-disable no-undef */

import request from 'supertest';
import app from '../../src/app';

import knex from '../../src/database';

describe('UsuarioModel', () => {
  afterAll(async (done) => {
    await knex.destroy();
    done();
  });

  afterEach(async (done) => {
    await knex('usuario').del();

    done();
  });

  it('Deve inserir um usuario com login usuario01', async (done) => {
    const usu = {
      data: {
        email: 'usuario01@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const response = await request(app)
      .post('/usuarios')
      .send(usu);

    expect(response.status).toBe(201);
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveProperty('location');

    const resp = await request(app)
      .get(`${response.body.location}`);

    expect(resp.status).toBe(200);
    expect(resp.body.data.login).toBe('usuario01');

    done();
  });

  it('Deve criticar login nulo ao inserir um usuario', async (done) => {
    const usu = {
      data: {
        email: 'usuario01@email.com',
        login: '',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const response = await request(app)
      .post('/usuarios')
      .send(usu);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Login não pode ser nulo');

    done();
  });

  it('Não deve inserir um usuario já existente', async (done) => {
    const usu = {
      data: {
        email: 'usuario01@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    await request(app)
      .post('/usuarios')
      .send(usu);

    const response = await request(app)
      .post('/usuarios')
      .send(usu);

    expect(response.status).toBe(500);

    done();
  });

  // it('Deve atualizar a senha do usuario01 para www utilizando o login', async (done) => {
  //   const usu = {
  //     email: 'usuario01@email.com',
  //     login: 'usuario01',
  //     nome: 'usuario zero um',
  //     senha: 'www',
  //   };

  //   const response = await request(app)
  //     .put('/usuarios')
  //     .send(usu);

  //   expect(response.status).toBe(201);
  //   expect(response.body.ok).toBe(true);

  //   done();
  // });

  it('Deve atualizar a senha do usuario01 para qqq', async (done) => {
    const usu = {
      data: {
        email: 'usuario04@email.com',
        login: 'usuario04',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const response = await request(app)
      .post('/usuarios')
      .send(usu);

    expect(response.status).toBe(201);
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveProperty('location');

    const resp = await request(app)
      .get(`${response.body.location}`);

    const usuUpdate = { ...resp.body.data, senha: 'qqq' };

    const responseUpdate = await request(app)
      .put('/usuarios')
      .send({ data: usuUpdate });

    expect(responseUpdate.status).toBe(201);
    expect(responseUpdate.body.data.senha).toBe('qqq');

    done();
  });

  it('Deve enviar status 404 ao tentar atualizar um usuario inexistente', async (done) => {
    const usu = {
      data: {
        id: 99,
        email: 'naoexiste@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: 'qqq',
      },
    };

    const response = await request(app)
      .put('/usuarios')
      .send(usu);

    expect(response.status).toBe(404);

    done();
  });

  it('Deve criticar ao tentar atualizar um usuario sem id', async (done) => {
    const usu = {
      data: {
        email: 'naoexiste@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: 'qqq',
      },
    };

    const response = await request(app)
      .put('/usuarios')
      .send(usu);

    expect(response.status).toBe(500);

    done();
  });

  it('Deve deletar um usuario', async (done) => {
    const usuTmp = {
      data: {
        email: 'usuario01@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const responseTmp = await request(app)
      .post('/usuarios')
      .send(usuTmp);

    expect(responseTmp.status).toBe(201);

    const usu = {
      id: `${responseTmp.body.data.id}`,
    };

    const response = await request(app)
      .delete('/usuarios')
      .send(usu);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('exclusão realizada com sucesso');

    done();
  });

  it('Deve criticar usuario inexistente ao deletar', async (done) => {
    const usu = {
      id: 99,
    };

    const response = await request(app)
      .delete('/usuarios')
      .send(usu);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Não foi encontrado registro para o id');

    done();
  });

  it('Deve recuperar uma lista de usuários', async (done) => {
    const usu01 = {
      data: {
        email: 'usuario01@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const usu02 = {
      data: {
        email: 'usuario02@email.com',
        login: 'usuario02',
        nome: 'usuario zero dois',
        senha: '02',
      },
    };

    await request(app)
      .post('/usuarios')
      .send(usu01);

    await request(app)
      .post('/usuarios')
      .send(usu02);

    const response = await request(app)
      .get('/usuarios');

    expect(response.status).toBe(200);
    expect(response.body.result.length).toBeGreaterThan(1);

    done();
  });

  it('Deve recuperar um usuário pelo id', async (done) => {
    const usuTmp = {
      data: {
        email: 'usuario01@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const responseTmp = await request(app)
      .post('/usuarios')
      .send(usuTmp);

    expect(responseTmp.status).toBe(201);

    const response = await request(app)
      .get(`${responseTmp.body.location}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeTruthy();
    // expect(response.body.data.id).toBe(1);

    done();
  });

  it('Deve criticar ao tentar recuperar um usuário com id inexistente', async (done) => {
    const response = await request(app)
      .get('/usuarios/99');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Não foi encontrado registro para o id');

    done();
  });

  it('Deve logar usuario informando login/senha', async (done) => {
    const usuTmp = {
      data: {
        email: 'usuario01@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const responseTmp = await request(app)
      .post('/usuarios')
      .send(usuTmp);

    expect(responseTmp.status).toBe(201);

    const usu = {
      data: {
        email: 'usuario01@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const buff = Buffer.from(`${usu.data.login}:${usu.data.senha}`);
    const base64data = buff.toString('base64');

    const response = await request(app)
      .post('/usuarios/login')
      .set('authorization', `Basic ${base64data}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('usuario01 logado com sucesso');

    done();
  });

  it('Deve criticar login nulo ao logar um usuario', async (done) => {
    const usu = {
      data: {
        email: 'usuario01@email.com',
        login: '',
        nome: 'usuario zero um',
        senha: '01',
      },
    };

    const buff = Buffer.from(`${usu.data.login}:${usu.data.senha}`);
    const base64data = buff.toString('base64');

    const response = await request(app)
      .post('/usuarios/login')
      .set('authorization', `Basic ${base64data}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Login não pode ser nulo');

    done();
  });

  it('Não deve logar usuario informando login/senha inválidos', async (done) => {
    const usu = {
      data: {
        email: 'usuario01@email.com',
        login: 'usuario01',
        nome: 'usuario zero um',
        senha: '01as',
      },
    };

    const buff = Buffer.from(`${usu.data.login}:${usu.data.senha}`);
    const base64data = buff.toString('base64');

    const response = await request(app)
      .post('/usuarios/login')
      .set('authorization', `Basic ${base64data}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('usuario01 nao logado');

    done();
  });
});
