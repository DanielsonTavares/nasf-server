/* eslint-disable no-undef */

import request from 'supertest';
import faker from 'faker';
import app from '../../src/app';
import knex from '../../src/database';

faker.locale = 'pt_BR';

describe('pessoa', () => {
  afterAll(async (done) => {
    await knex.destroy();
    done();
  });

  afterEach(async (done) => {
    await knex('pessoa').del();

    done();
  });

  it('Deve criticar cpf nulo', async (done) => {
    const newPessoa = {
      data: {
        nome: faker.name.findName(),
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cpf obrigatório');

    done();
  });

  it('Deve criticar nome nulo', async (done) => {
    const newPessoa = {
      data: {
        nome: '',
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Nome obrigatório');

    done();
  });

  it('Deve criticar nascimento nulo', async (done) => {
    const newPessoa = {
      data: {
        nome: faker.name.findName(),
        nascimento: '',
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Nascimento obrigatório');

    done();
  });

  it('Deve criticar cpf inválido', async (done) => {
    const newPessoa = {
      data: {
        nome: faker.name.findName(),
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10178473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cpf inválido');
    done();
  });

  it('Deve criticar telefone fixo sem ddd', async (done) => {
    const newPessoa = {
      data: {
        nome: faker.name.findName(),
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('DDD do telefone fixo obrigatório');
    done();

    done();
  });

  it('Deve criticar telefone celular sem ddd', async (done) => {
    const newPessoa = {
      data: {
        nome: faker.name.findName(),
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('DDD do telefone celular obrigatório');
    done();

    done();
  });

  it('Deve inserir pessoa', async (done) => {
    const newPessoa = {
      data: {
        nome: faker.name.findName(),
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Recurso criado com sucesso.');

    done();
  });

  it('Deve buscar pessoa informando parte do nome', async (done) => {
    const newPessoa = {
      data: {
        nome: 'danielson de oliveira tavares',
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(201);

    const newPessoa02 = {
      data: {
        nome: 'daniella souza',
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response02 = await request(app)
      .post('/pessoas')
      .send(newPessoa02);

    expect(response02.status).toBe(201);

    const responseGet = await request(app)
      .get('/pessoas/busca/dani');

    expect(responseGet.status).toBe(200);

    done();
  });

  it('Deve buscar por filtro', async (done) => {
    const newPessoa = {
      data: {
        nome: 'danielson de oliveira tavares',
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response = await request(app)
      .post('/pessoas')
      .send(newPessoa);

    expect(response.status).toBe(201);

    const newPessoa02 = {
      data: {
        nome: 'daniella souza',
        nascimento: faker.date.between('1980-01-01', '1989-12-31'),
        sexo: 'M',
        email: faker.internet.email(),
        ddd_fixo: '21',
        tel_fixo: '22221111',
        ddd_cel: '21',
        tel_cel: '933334444',
        cep: faker.address.zipCode().replace('-', ''),
        tipo_logradouro: faker.address.streetSuffix(),
        logradouro: faker.address.streetName(),
        numero_logradouro: faker.random.number(),
        complemento: faker.address.secondaryAddress(),
        bairro: faker.address.county,
        cidade: faker.address.city(),
        uf: faker.address.stateAbbr(),
        cpf: '10678473757',
        rg: '123456789',
        data_criacao: faker.date.recent(),
        data_atualizacao: null,
      },
    };

    const response02 = await request(app)
      .post('/pessoas')
      .send(newPessoa02);

    expect(response02.status).toBe(201);

    const responseGet = await request(app)
      .get('/pessoas/filtro/?nome=dan&idade=36&sexo=M');

    expect(responseGet.status).toBe(200);
    expect(responseGet.body.data[0]).toHaveProperty('nome');
    done();
  });
});
