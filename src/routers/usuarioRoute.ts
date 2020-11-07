import express from 'express';

import UsuarioController from '../controllers/usuarioController';

const router = express.Router();

const usuarioController = new UsuarioController();

router.post('/usuarios', usuarioController.post);
router.put('/usuarios', usuarioController.put);
router.delete('/usuarios', usuarioController.delete);
router.get('/usuarios', usuarioController.get);
router.get('/usuarios/:id', usuarioController.getById);
router.post('/usuarios/login', usuarioController.login);

export default router;
