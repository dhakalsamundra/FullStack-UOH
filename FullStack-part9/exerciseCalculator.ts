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
    const trainingDays = arrayOfHour.filter((hour) => hour !== 0).length
    const average = totalHours/periodLength
    const success = average > target ? true : false
    const rating = success ? 2 : 1
    const ratingDescription = rating === 1 ? 'not too bad but could be better' : 'Good but it can be even better'

    return{
        target, periodLength, success, average, rating, ratingDescription, trainingDays
    }

}