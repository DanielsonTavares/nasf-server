import express from 'express';

import UsuarioController from '../controllers/usuarioController';
import * as Jwt from '../utils/jwt';

const router = express.Router();

const usuarioController = new UsuarioController();

router.post('/usuarios/token', usuarioController.token);
router.post('/usuarios/login', usuarioController.login);

// router.use((req, res, next) => {
//   try {
//     const [, token] = req.headers.authorization ? req.headers.authorization?.split(' ') : [];

//     if (!token) {
//       return res.status(401).json({ message: 'Token não fornecido' });
//     }

//     try {
//       const payload = Jwt.verify(token);
//       if (payload) {
//         return res.status(200).json({ message: 'ok' });
//       }
//     } catch (error) {
//       return res.status(400).json({ message: error.message });
//     }

//     return res.status(401).json({ message: 'Token inválido' });
//   } catch (e) {
//     return next(e);
//   }
// });

router.post('/usuarios', usuarioController.post);
router.put('/usuarios', usuarioController.put);
router.delete('/usuarios', usuarioController.delete);
router.get('/usuarios/:id', usuarioController.getById);
router.get('/usuarios', usuarioController.get);

export default router;
