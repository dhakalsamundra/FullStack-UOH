const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
// const Comment = require('../models/comments')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).send(blogs)
})

blogRouter.post('/', async (req, res) => {
  const data = req.body

  if(data.title === undefined && data.url === undefined) {
    return res.status(400).end()
  } else {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog ({
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  }
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog) {
    res.status(200).send(blog)
  } else {
    res.status(404).end()
  }
})

blogRouter.post('/:id/comments', async (req, res) => {
  const { id } = req.params

  const data = req.body

  if (data.content === undefined) {
    res.status(400).end()
  }
  // const comment = new Comment({
  //   content: data.content,
  //   blog: id
  // })

  const { content } = req.body
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.send({ message: 'not found' })
  } else {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    blog.comments = blog.comments.concat({ content })

    const savedBlog = await blog.save()
    const populatedBlog = await savedBlog
      .populate('user', {
        username: 1,
        name: 1,
      })
      .execPopulate()

    res.status(201).send(populatedBlog)
  }})

blogRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(blog && blog.user.toString() === decodedToken.id.toString()){
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } else {
    res.status(401).send({ error: 'Not authorized' })

  }
})

blogRouter.put('/:id', async(req, res) => {
  const entry = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, entry, { new: true }).populate('user', { username: 1, name: 1 })
  res.status(200).json(updatedBlog)
})

blogRouter.get('/info', (req, res) => {
  const newDate = new Date()
  const details = `Phonebook have info for 4 people. <br/><br/> ${newDate}`
  res.send(details)
})

module.exports = blogRouter
