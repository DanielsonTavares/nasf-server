import { Request, Response } from 'express';

class LoginController {
  async index(request: Request, response: Response) {
    return response.json({
      message: 'login realizado com sucesso',
    });
  }

  async valida(request: Request, response: Response) {
    return response.json({
      message: 'validado',
    });
  }
}

export default LoginController;
