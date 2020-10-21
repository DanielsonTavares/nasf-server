import dotenv from 'dotenv';
import express from 'express';

import usuarioRotas from './routers/usuarioRoute';
import grupoRotas from './routers/grupoRoute';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(usuarioRotas);
app.use(grupoRotas);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
