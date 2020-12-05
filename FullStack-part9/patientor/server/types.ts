export interface diagnoses {
    name: string
    code: string
    latin?: string
}

export interface patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
}