interface exerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const exerciseCalc = ( arrayOfHour: Array<number>, target: number): exerciseResult => {
    if(!target || !arrayOfHour) throw new Error('parameters missing')
    if(!Array.isArray(arrayOfHour)) throw new Error('malformatted parameters')
    target = Number(target)
    //test the array to return boolean value of isNan
    const validateNaN = arrayOfHour.some((hour) => isNaN(hour))
    if(isNaN(target) || validateNaN) throw new Error('malformatted parameters')
    
    const totalHours = arrayOfHour.reduce((acc, cur) => acc + cur)
    const periodLength = arrayOfHour.length
    const success = totalHours > target ? true : false
    const trainingDays = arrayOfHour.filter((hour) => hour).length
    const average = totalHours/trainingDays
    const rating = success ? 2 : 1
    const ratingDescription = rating === 1 ? 'not too bad but could be better' : 'Good but it can be even better'

    return{
        target, periodLength, success, average, rating, ratingDescription, trainingDays
    }

}

console.log(exerciseCalc([3, 0, 2, 4.5, 0, 3, 1], 10))