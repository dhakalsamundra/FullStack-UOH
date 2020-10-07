const blogRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  // .populate('user', { username: 1, name: 1 })
  response.status(200).send(blogs)
})

blogRouter.post('/', async (req, res, next) => {
  const data = req.body

  if(data.title === undefined && data.url === undefined) {
    return res.status(400).end()
  } else {
    const blog = new Blog ({
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes
    })
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  }
  // const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // if (!req.token || !decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById()
  /*blog.save()
      .then(savedBlog => {
        response.json(savedBlog.toJSON())
      })
      .catch(error => next(error))*/
  /*const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())*/
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog) {
    res.status(200).send(blog)
  } else {
    res.status(404).end()
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  // const blog = await Blog.findById(req.params.id)
  // const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // if (!req.token || !decodedToken.id) {
  //   return res.status(401).json({ error:'token missing or invalid' })
  // }
  // if (blog.user.toString() !== decodedToken.id.toString()) {
  //   await Blog.findByIdAndRemove(req.params.id)
  //   res.status(204).end()
  // } else {
  //   return res.status(401).json({ error: 'a blog can only be deleted by the user who added the blog' })
  // }
  const blog = await Blog.findById(req.params.id)
  if(blog){
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } else {
    res.status(404)
  }
})

blogRouter.put('/:id', async(req, res) => {
  const entry = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, entry, { new: true })
  res.status(200).json(updatedBlog)
})

blogRouter.get('/info', (req, res) => {
  const newDate = new Date()
  const details = `Phonebook have info for 4 people. <br/><br/> ${newDate}`
  res.send(details)
})

module.exports = blogRouter