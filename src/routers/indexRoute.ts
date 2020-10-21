import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'pagina inicial', txt: process.env.PATH_DIST });
});

export default router;
