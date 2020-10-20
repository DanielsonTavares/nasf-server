import express from 'express';

import LoginController from './controllers/loginController';

const router = express.Router();

const loginController = new LoginController();

// define the home page route
router.get('/', (req, res) => {
  res.json({ message: 'home' });
});
// define the about route
router.get('/about', (req, res) => {
  res.json({ message: 'about' });
});

router.get('/login', loginController.index);
router.get('/valida', loginController.valida);

export default router;
