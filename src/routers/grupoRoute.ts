import express from 'express';

import GrupoController from '../controllers/grupoController';

const router = express.Router();

const grupoController = new GrupoController();

router.post('/grupo', grupoController.post);
router.put('/grupo', grupoController.put);
router.delete('/grupo', grupoController.delete);
router.get('/grupo', grupoController.get);
router.get('/grupo/:id', grupoController.getById);

export default router;
