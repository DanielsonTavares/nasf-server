/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import usuarioRotas from './routers/usuarioRoute';
import grupoRotas from './routers/grupoRoute';
import indexRotas from './routers/indexRoute';

const app = express();
const port = process.env.PORT;

app.use(usuarioRotas);
app.use(grupoRotas);
app.use(indexRotas);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
