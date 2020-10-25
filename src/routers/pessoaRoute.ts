import express from 'express';

import PessoaController from '../controllers/pessoaController';

const router = express.Router();

const pessoaController = new PessoaController();

router.post('/pessoa', pessoaController.post);
router.put('/pessoa', pessoaController.put);
router.delete('/pessoa', pessoaController.delete);
router.get('/pessoa', pessoaController.get);
router.get('/pessoa/:id', pessoaController.getById);

export default router;
