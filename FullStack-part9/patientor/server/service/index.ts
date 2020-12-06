import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { diagnoses, NewPatient, nonSensitiveEntries } from '../types'
import diagnosesData from '../data/diagnoses.json'
import getData from '../data/patients'

const getDiagnosesData = (): Array<diagnoses> => {
    return diagnosesData
}

const getPatientsData = (): Array<nonSensitiveEntries> => {
    return getData.map((data) => _.omit(data, 'ssn'));
  };

const addPatientsData = ( newEntry: NewPatient ) : nonSensitiveEntries => {
    const data = {
        id: uuidv4(), ...newEntry
    }
    getData.push(data)
    return _.omit(data, 'ssn')
}

export default {
    getDiagnosesData,
    getPatientsData,
    addPatientsData,
}