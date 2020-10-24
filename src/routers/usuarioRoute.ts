import express from 'express';

import UsuarioController from '../controllers/usuarioController';

const router = express.Router();

const usuarioController = new UsuarioController();

router.post('/usuario', usuarioController.post);
router.put('/usuario', usuarioController.put);
router.delete('/usuario', usuarioController.delete);
router.get('/usuario', usuarioController.get);
router.get('/usuario/:id', usuarioController.getById);
router.post('/usuario/login', usuarioController.login);

export default router;
