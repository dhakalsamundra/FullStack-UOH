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
    const success = average >= target ? true : false
    const rating = (average < target) ? 1 : (average === target) ? 2 : 3
    const ratingDescription = rating === 1 ? 'too bad' : rating === 2 ? 'Good but it can be even better' : "Outstanding"

    return{
        target, periodLength, success, average, rating, ratingDescription, trainingDays
    }

}