import express from 'express'
import cors from 'cors'

import patients from './data/patients.json'
import diagnoses from './data/diagnoses.json'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/ping', (_req, res) => {
    res.status(200).send('pong')
})

app.get('/api/patients', (_req, res) => {
    res.status(200).send(patients)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
