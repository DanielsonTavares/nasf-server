import express from 'express';

import GrupoController from '../controllers/grupoController';

const router = express.Router();

const grupoController = new GrupoController();

router.post('/grupos', grupoController.post);
router.put('/grupos', grupoController.put);
router.delete('/grupos', grupoController.delete);
router.get('/grupos', grupoController.get);
router.get('/grupos/:id', grupoController.getById);

export default router;
