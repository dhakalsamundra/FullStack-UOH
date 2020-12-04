interface BmiCalc {
  weight: number,
  height: number
}
type bmi = (queryweight: any, queryheight: any) => string;

const parseArguments = ( weight: number, height: number): BmiCalc => {
  if (!weight || !height) throw new Error("required fields missing");

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    throw new Error("invalid arguments");
  }

  return { weight: Number(weight), height: Number(height) };
}
export const bmiCalc: bmi = (queryweight, queryheight) => {
  const { weight, height } = parseArguments(queryweight, queryheight)
  const bmi = weight/Math.pow(height, 2)
  switch (true) {
    case bmi <= 18.5:
      return "underweight ";
    case bmi <= 25:
      return "Normal(Healthy weight)";
    case bmi <= 30:
      return "Overweight";
    default:
      return "too much overWeight";
  }
}

console.log(bmiCalc(180, 74))
