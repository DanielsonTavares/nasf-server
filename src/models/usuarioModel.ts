interface IUsuario {
  nome: String;
  login: String;
  senha: String;
  email: String;
}

class Usuario {
  nome: String;

  login: String;

  senha: String;

  email: String;

  data_atualizacao: Date;

  // nome: String, login: String, senha: String, email: String

  constructor(param = {
    nome: '', login: '', senha: '', email: '',
  }) {
    this.nome = param.nome;
    this.login = param.login;
    this.senha = param.senha;
    this.email = param.email;
    this.data_atualizacao = new Date();
  }

  async create() {
    console.log(`criando usuario${this.login}`);
  }
}

export default Usuario;
