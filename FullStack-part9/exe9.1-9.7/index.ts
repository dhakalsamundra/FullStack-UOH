import express from 'express';

import {bmiCalc} from './bmiCalc';
import {exerciseCalc} from './exerciseCalculator'
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try{
        const { weight, height } = req.query;
        const bmiCalcu = bmiCalc(weight, height);
        res.status(200).send(bmiCalcu);
    } catch (error){
        res.status(400).send({ error: error.message });
    }
})

app.get('/exercise', (req, res) => {
  try{
  const { arrayOfHour, target } = req.body
  const result = exerciseCalc(arrayOfHour, target)
  res.status(200).send(result)
  } catch (error){
    res.status(400).send({ error: error.message})
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
