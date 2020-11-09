/* eslint-disable no-undef */
import * as Valida from '../../src/utils/validations';

describe('Validações', () => {
  it('Deve ser cpf inválido caso tenha tamanho diferente de 11', () => {
    expect(Valida.cpf('1234567890112')).toBeFalsy();
  });

  it('Deve ser cpf inválido caso tenha caractere diferente de números', () => {
    expect(Valida.cpf('12a45678901')).toBeFalsy();
    expect(Valida.cpf('124*5678901')).toBeFalsy();
  });

  it('Deve validar cpf informado com formatação', () => {
    expect(Valida.cpf('106.784.737-57')).toBeTruthy();
  });

  it('Deve validar cpf informado sem formatação', () => {
    expect(Valida.cpf('10678473757')).toBeTruthy();
  });

  // *****************************

  it('Deve ser telefone inválido caso tenha tamanho diferente de 8', () => {
    expect(Valida.telefone('1234567890112')).toBeFalsy();
  });

  it('Deve ser telefone inválido caso tenha caractere diferente de números', () => {
    expect(Valida.cpf('12a45678901')).toBeFalsy();
    expect(Valida.cpf('124*5678901')).toBeFalsy();
  });

  it('Deve validar telefone informado com formatação', () => {
    expect(Valida.telefone('3605-4678')).toBeTruthy();
  });

  it('Deve validar telefone informado sem formatação', () => {
    expect(Valida.telefone('36054678')).toBeTruthy();
  });
});
