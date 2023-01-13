interface ExerciseValues {
  target: number;
  dailyExerciseHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  
  if (args.length < 4) { 
    throw new Error('Not enough arguments');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_execPath, _filePath, targetArg, ...dailyExerciseHoursArg] = args;

  const target = Number(targetArg);
  if (isNaN(target)) {
    throw new Error('Provided values were not numbers!');
  }

  const dailyExerciseHours = dailyExerciseHoursArg.map((h) => {
    const hours = Number(h);
    if (isNaN(hours)) {
      throw new Error('Provided values were not numbers!');
    }
    return hours;
  });

  return { target, dailyExerciseHours };

};

const getRatingInfo = (target: number, average: number): [number, string] => {
  if (average < target) {
    return [1, 'Keep on trying! You can do better next week!'];
  } else if (average < 1.25 * target) {
    return [2, 'Good work! You fulfilled your goal!'];
  } else {
    return [3, 'Amazing job! Keep up the great work!'];
  }
};

export const calculateExercises = (target: number, dailyExerciseHours: number[]): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length;
  const average = dailyExerciseHours.reduce((acc, h) => acc + h) / periodLength;
  const success = average >= target;
  const [rating, ratingDescription] = getRatingInfo(target, average);
  return { periodLength, trainingDays, target, average, success, rating, ratingDescription };
};

try {
  const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
  const result = calculateExercises(target, dailyExerciseHours);
  console.log('Target:', target);
  console.log('Daily Exercise Hours:', dailyExerciseHours);
  console.log('Result:', result);
} catch (error: unknown) {
  let errorMessage = 'An error occurred.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
