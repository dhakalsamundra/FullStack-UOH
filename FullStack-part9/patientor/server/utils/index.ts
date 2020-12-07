import { text } from 'express'
import { NewPatient, Gender, Entry } from '../types'

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String
}
const parseString = (string: any): string => {
    if(!text || !isString(string)) {
        throw new Error('Incorrect or missing information')
    }
    return string
}
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
const parseDate = (date: any): string => {
    if(!date || !isDate(date) || !isString(date)){
        throw new Error('Incorrect format or missing date')
    }
    return date
}
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
}
const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Invalid or missing gender filed')
    }
    return gender
}
const parseEntries = (entries: any): Entry => {
    return entries
}

const toNewPatientEntry = (object: any): NewPatient => {
    return {
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        name: parseString(object.name),
        occupation: parseString(object.occupation),
        ssn: parseString(object.ssn),
        entries: parseEntries(object.entries)
    }
}

export default toNewPatientEntry


// const toNewDiaryEntry = (object: any): NewDiaryEntry => {
//     return {
//       date: parseDate(object.date),
//       comment: parseComment(object.comment),
//       weather: parseWeather(object.weather),
//       visibility: parseVisibility(object.visibility)
//     };
//   };

// const parseWeather = (weather: any): Weather => {
//     if (!weather || !isWeather(weather)) {
//         throw new Error('Incorrect or missing weather: ' + weather);
//     }
//     return weather;
//   };
// const isString = (text: any): text is string => {
//     return typeof text === 'string' || text instanceof String;
//   }
