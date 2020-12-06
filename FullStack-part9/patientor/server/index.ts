import express from 'express'
import cors from 'cors'

import diagnosesRouter from './routes/diagonses'
import patientsRouter from './routes/patients'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/ping', (_req, res) => {
    res.status(200).send('pong')
})

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
