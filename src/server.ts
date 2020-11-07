import app from './app';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port} in ${process.env.NODE_ENV} mode!`);
});
