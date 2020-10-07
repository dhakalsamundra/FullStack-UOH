// const bcrypt = require('bcrypt')
// const usersRouter = require('express').Router()
// const User = require('../models/user')

// usersRouter.get('/', async (req, res) => {
//   const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
//   res.json(users.map(u => u.toJSON()))
// })

// usersRouter.post('/', async (req, res, next) => {
//   if (req.body.password.length < 3) {
//     return res.status(400).send('Password length is shorter than 3').end()
//   }
//   try {
//     const body = req.body
//     const saltRounds = 10
//     const passwordHash = await bcrypt.hash(body.password, saltRounds)

//     const user = new User({
//       username: body.username,
//       name: body.name,
//       passwordHash,
//       blogs: body.blogs,
//     })

//     const savedUser = await user.save()
//     res.status(201).json(savedUser.toJSON())

//   } catch (exception) {
//     next(exception)
//   }
// })

// module.exports = usersRouter