import express from 'express'

import service from '../service'
import toNewPatientsEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
    const getData = service.getPatientsData()
    res.status(200).send(getData)
})

router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatientsEntry(req.body)
        const addNewPatient = service.addPatientsData(newPatient)
        res.status(201).send(addNewPatient)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

export default router