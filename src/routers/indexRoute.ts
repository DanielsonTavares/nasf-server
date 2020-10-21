import express from 'express';
import knexfile from '../knexfile';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'pagina inicial', txt: knexfile.development.migrations });
  next();
});

export default router;
