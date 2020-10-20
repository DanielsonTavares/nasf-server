import express from 'express';

import rotas from './routes';

const app = express();
const port = 3333;

app.use(rotas);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
