const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()))
  })
})

personsRouter.post('/', (request, response, next) => {
  const phonebook = request.body

  const person = new Person ({
    name: phonebook.name,
    number: phonebook.number
  })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  })
    .catch(err => next(err))
})


personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

personsRouter.put('/:id', (req, res, next) => {
  const phonebook = req.body

  const person = {
    name: phonebook.name,
    number: phonebook.number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(err => next(err))
})

personsRouter.get('/info', (req, res) => {
  const newDate = new Date()
  const details = `Phonebook have info for 4 people. <br/><br/> ${newDate}`
  res.send(details)
})

module.exports = personsRouter