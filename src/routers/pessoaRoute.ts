import express from 'express';

import PessoaController from '../controllers/pessoaController';

const router = express.Router();

const pessoaController = new PessoaController();

router.post('/pessoas', pessoaController.post);
router.put('/pessoas', pessoaController.put);
router.delete('/pessoas', pessoaController.delete);
router.get('/pessoas', pessoaController.get);
router.get('/pessoas/:id', pessoaController.getById);

export default router;
