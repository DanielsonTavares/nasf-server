import express from 'express';

const app = express();
const port = 3333;

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
