export interface diagnoses {
    name: string
    code: string
    latin?: string
}

export interface Entry {
}

export interface patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry

}
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type nonSensitiveEntries = Omit<patient, 'ssn' >


// omitting the id from type to input new patient type
export type NewPatient = Omit<patient, 'id'>


