import express from 'express';

import usuarioRotas from './routers/usuarioRoute';
import grupoRotas from './routers/grupoRoute';

const app = express();
const port = 3333;

app.use(usuarioRotas);
app.use(grupoRotas);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
