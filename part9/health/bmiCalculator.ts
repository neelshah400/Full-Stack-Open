interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {  
  
  if (args.length < 4) { 
    throw new Error('Not enough arguments');
  } else if (args.length > 4) { 
    throw new Error('Too many arguments');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_execPath, _filePath, heightArg, weightArg] = args;
  const height = Number(heightArg);
  const weight = Number(weightArg);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return { height, weight };

};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  const bmi = calculateBmi(height, weight);
  console.log(`A person with height ${height} cm and weight ${weight} kg is: ${bmi}`);
} catch (error: unknown) {
  let errorMessage = 'An error occurred.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
