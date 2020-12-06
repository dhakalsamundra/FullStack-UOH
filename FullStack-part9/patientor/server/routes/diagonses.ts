import express from 'express'

import service from '../service'

const router = express.Router()

router.get('/', (_req, res) => {
    const getData = service.getDiagnosesData()
    res.status(200).send(getData)
})

export default router