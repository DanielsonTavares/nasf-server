/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import usuarioRotas from './routers/usuarioRoute';
import grupoRotas from './routers/grupoRoute';
import indexRotas from './routers/indexRoute';
import pessoaRotas from './routers/pessoaRoute';

const app = express();
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));

const port = process.env.PORT;

app.use(usuarioRotas);
app.use(grupoRotas);
app.use(indexRotas);
app.use(pessoaRotas);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
