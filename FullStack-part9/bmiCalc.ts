interface BmiCalc {
  weight: number,
  height: number
}

type bmi = (weight: number, height: number) => BmiCalc
type bmiType = (weight: any, height: any) => string

const parseArguments: bmi = ( weight: number, height: number): BmiCalc => {
  if (!weight || !height) throw new Error("required fields missing");

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    throw new Error("invalid arguments");
  }

  return { weight: Number(weight), height: Number(height) };
}
export const bmiCalc: bmiType = (kg: number, cm: number) => {
  const { weight, height } = parseArguments(kg, cm)
  const bmi = (weight / Math.pow(height, 2)) * 10000;
  // console.log(bmi)
  switch (true) {
    case (bmi <= 15):
      return "very severly underweight";
    case (bmi>= 15 && bmi < 18.5):
      return "severely underweight";
    case (bmi>= 18.5 && bmi <= 24.9):
      return "Normal (healthy weight)";
    case (bmi>= 25 && bmi <= 29.9):
      return "Overweight";
    case (bmi>= 30 && bmi <= 34.9):
      return "Obese Classs I (Moderately obese)";
    case (bmi >= 35 && bmi <= 39.9):
      return "Obese Classs II (Severely obese)";
    default:
      return "Obese Classs III (very severely obese)";
  }
}