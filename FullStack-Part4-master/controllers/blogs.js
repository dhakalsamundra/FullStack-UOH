const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (req, res, next) => {
  const entry = req.body

  if(req.body.title === undefined && req.body.url === undefined) {
    res.status(400).end()
    return
  }
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog ({
      title: entry.title,
      author: entry.author,
      url: entry.url,
      likes: entry.likes,
      user: user._id
    })
    /*blog.save()
      .then(savedBlog => {
        response.json(savedBlog.toJSON())
      })
      .catch(error => next(error))*/
    /*const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())*/
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

/*blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})*/

blogRouter.delete('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error:'token missing or invalid' })
  }
  try {
    if (blog.user.toString() !== decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } else {
      return res.status(401).json({ error: 'a blog can only be deleted by the user who added the blog' })
    }
  } catch (exception) {
    res.status(400).end()
    next(exception)
  }
})

blogRouter.put('/:id', async(req, res, next) => {
  const entry = req.body

  const blog = {
    title: entry.title,
    author: entry.author,
    url: entry.url,
    likes: entry.likes,
    user: entry.user
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.status(201).json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/info', (req, res) => {
  const newDate = new Date()
  const details = `Phonebook have info for 4 people. <br/><br/> ${newDate}`
  res.send(details)
})

module.exports = blogRouter