import express from 'express';

import GrupoController from '../controllers/grupoController';

const router = express.Router();

const usuarioController = new GrupoController();

router.post('/grupo', usuarioController.post);
router.put('/grupo/:id', usuarioController.put);
router.delete('/grupo/:id', usuarioController.delete);
router.get('/grupo', usuarioController.get);
router.get('/grupo/:id', usuarioController.getById);

export default router;
