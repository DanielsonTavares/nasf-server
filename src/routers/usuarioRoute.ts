import express, { Request, Response, NextFunction } from 'express';

import UsuarioController from '../controllers/usuarioController';
import * as Jwt from '../utils/jwt';

const router = express.Router();

const usuarioController = new UsuarioController();

const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [, token] = req.headers.authorization ? req.headers.authorization?.split(' ') : [];

    if (!token) {
      return res.status(401).json({ message: 'Token não informado.' });
    }

    try {
      const payload = Jwt.verify(token);
      if (payload) {
        return next();
      }
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao validar o token.' });
    }

    return res.status(401).json({ message: 'Token inválido' });
  } catch (e) {
    return res.status(500).json({ message: 'Erro ao validar o token', error: e.stack });
  }
};

router.post('/usuarios/token', usuarioController.token);
router.post('/usuarios/login', usuarioController.login);

// router.use(authMiddleWare);

router.post('/usuarios', authMiddleWare, usuarioController.post);
router.put('/usuarios', authMiddleWare, usuarioController.put);
router.delete('/usuarios', usuarioController.delete);
router.get('/usuarios/:id', usuarioController.getById);
router.get('/usuarios', authMiddleWare, usuarioController.get);

export default router;
