const calculateBmi = (bodyHeight: number, bodyMass: number): string => {
  const bodyHeightMetres = bodyHeight / 100;
  const bmi = bodyMass / bodyHeightMetres ** 2;
  if (bmi < 18.5) {
    return 'Underweight (thinness)';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  }
  else {
    return 'Obese';
  }
};

console.log(calculateBmi(180, 74));

export default calculateBmi;


