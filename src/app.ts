/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import usuarioRotas from './routers/usuarioRoute';
import grupoRotas from './routers/grupoRoute';
import indexRotas from './routers/indexRoute';
import pessoaRotas from './routers/pessoaRoute';
import { handleError } from './models/Erro';

const app = express();
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));

app.use(grupoRotas);
app.use(indexRotas);
app.use(pessoaRotas);
app.use(usuarioRotas);

app.use((req, res, next) => {
  res.statusCode = 400;
  res.json({ msg: 'rota invalida' });

  next();
});

// eslint-disable-next-line no-unused-vars
app.use(async (err: any, req: any, res: any, next: any) => {
  await handleError(err, res);
});

export default app;
