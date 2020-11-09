function cpf(pCpf: string) {
  let cpfStr = pCpf;

  if (typeof cpfStr !== 'string') return false;

  cpfStr = cpfStr.replace(/[\s.-]*/igm, '');

  if (cpfStr.length !== 11
    || cpfStr === '00000000000'
    || cpfStr === '11111111111'
    || cpfStr === '22222222222'
    || cpfStr === '33333333333'
    || cpfStr === '44444444444'
    || cpfStr === '55555555555'
    || cpfStr === '66666666666'
    || cpfStr === '77777777777'
    || cpfStr === '88888888888'
    || cpfStr === '99999999999'
  ) {
    return false;
  }
  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfStr.substring(i - 1, i), 10) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) resto = 0;

  if (resto !== parseInt(cpfStr.substring(9, 10), 10)) return false;

  soma = 0;

  for (let i = 1; i <= 10; i++) { soma += parseInt(cpfStr.substring(i - 1, i), 10) * (12 - i); }

  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) resto = 0;

  if (resto !== parseInt(cpfStr.substring(10, 11), 10)) return false;

  return true;
}

const telefone = (str: string): boolean => {
  let tel = str;
  tel = tel.replace(/[\s()-]*/igm, '');

  if (tel.length !== 8) {
    return false;
  }

  return true;
};

export { cpf, telefone };
