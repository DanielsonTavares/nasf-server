import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'pagina inicial' });
  next();
});

export default router;
