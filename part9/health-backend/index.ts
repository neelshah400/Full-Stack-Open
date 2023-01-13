import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    if (!height || !weight) {
      throw new Error('parameters missing');
    }
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error('parameters invalid');
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({ height: Number(height), weight: Number(weight), bmi });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'unknown error';
    res.status(400).send({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, dailyExerciseHours } = req.body;
    if (!target || !dailyExerciseHours) {
      throw new Error('parameters missing');
    }
    if (isNaN(Number(target)) || !Array.isArray(dailyExerciseHours)) {
      throw new Error('parameters invalid');
    }
    const dailyExerciseHoursParsed = dailyExerciseHours.map((h) => {
      const hours = Number(h);
      if (isNaN(hours)) {
        throw new Error('parameters invalid');
      }
      return hours;
    });
    if (dailyExerciseHoursParsed.length < 1) {
      throw new Error('parameters invalid');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(Number(target), dailyExerciseHoursParsed);
    return res.send({ result });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'unknown error';
    return res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
