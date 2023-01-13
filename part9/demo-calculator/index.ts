import express from 'express';
import { calculator } from './calculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;
    if (!value1 || !value2 || !op) {
      throw new Error('parameters missing');
    }
    if (isNaN(Number(value1)) || isNaN(Number(value2))) {
      throw new Error('parameters invalid');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculator(Number(value1), Number(value2), op);
    return res.send({ result });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'unknown error';
    return res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});